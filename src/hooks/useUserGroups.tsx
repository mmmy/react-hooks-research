import { useState, useEffect, useRef, useMemo } from 'react';
import { getUserGroups } from '@/services/user';
import { IUser } from '@/services/user.type';
import { Select, SelectProps } from 'antd';

export default function useUserGroups() {
  const [pending, setPending] = useState(false);
  const [data, setData] = useState<IUser.UserGroupType[]>([]);
  const [selectedValue, setSelectedValue] = useState('');

  const fetchData = async () => {
    setPending(true);
    setData([]);
    const res = await getUserGroups();
    if (res.result) {
      setData(res.data || []);
    }
    setPending(false);
  };

  const renderSelect = (props?: SelectProps<string>) => {
    return (
      <Select
        value={selectedValue}
        onSelect={(v) => setSelectedValue(v)}
        showSearch
        filterOption={(k, options) => options?.title.indexOf(k) > -1}
        {...props}
      >
        {data.map((d) => (
          <Select.Option value={d.id} title={d.name}>
            {d.name}
          </Select.Option>
        ))}
      </Select>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    pending,
    data,
    selectedValue,
    fetchData,
    renderSelect,
  };
}

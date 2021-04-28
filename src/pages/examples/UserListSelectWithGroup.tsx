import React, { useState } from 'react';
import { Select, SelectProps } from 'antd';
import useUserList from '@/hooks/useUserList';
import { Form } from 'antd';
import { Spin } from 'antd';
import useUserGroups from '@/hooks/useUserGroups';

/**
 * 封装一个带远程搜索的Select组件
 * @param props 和antd 的Select组件保持一致
 */
function UserListSelect(props: SelectProps<string>) {
  const [keyword, setKeyword] = useState('');
  const userListState = useUserList({
    page: 1,
    page_size: 100,
    keyword,
    groupId: '',
  });
  // 一下两种方式是完全效果相同的
  // 方式一:
  return (
    <Select
      {...props}
      showSearch
      onSearch={(k) => setKeyword(k)}
      filterOption={false}
      loading={userListState.pending}
      notFoundContent={
        userListState.pending ? <Spin size={'small'} /> : '无数据'
      }
    >
      {userListState.data.items.map((item, i) => {
        return (
          <Select.Option
            title={item.name}
            value={item.id}
            key={`${item.id}-${i}`}
          >
            {item.name}
          </Select.Option>
        );
      })}
    </Select>
  );
  // 方式二:
  return userListState.renderSelect({
    showSearch: true,
    onSearch: (k) => setKeyword(k),
    filterOption: false,
    loading: userListState.pending,
    ...props,
  });
}

/**
 * 一次性加载所有数据, 可搜索的选择器
 * @param props
 * @constructor
 */
function UserListSelectLocal(props: SelectProps<string>) {
  const userListState = useUserList({
    page: 1,
    page_size: 10000,
    keyword: '',
    groupId: '',
  });
  return userListState.renderSelect({
    showSearch: true,
    loading: userListState.pending,
    filterOption: (k, option) => option?.title.indexOf(k) > -1,
    ...props,
  });
}

export default function UserListSelectDemo() {
  // user groups的业务逻辑
  const userGroupState = useUserGroups();
  // user list业务逻辑, 这里依赖groups
  const userListState = useUserList({
    page: 1,
    page_size: 100,
    keyword: '',
    groupId: userGroupState.selectedValue,
  });
  return (
    <div style={{ padding: 20 }}>
      <p>使用组合的自定义hooks</p>
      <Form layout={'inline'}>
        <Form.Item label={'user group'}>
          {userGroupState.renderSelect({ style: { width: 200 } })}
        </Form.Item>
        <Form.Item label={'user in group'}>
          {userListState.renderSelect({
            style: { width: 200 },
            filterOption: (k, options) => options?.title.indexOf(k) > -1,
          })}
        </Form.Item>
      </Form>
    </div>
  );
}

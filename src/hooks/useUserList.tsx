import { useState, useEffect, useRef, useMemo } from 'react';
import { getUserList } from '@/services/user';
import { IUser, IUserRequest } from '@/services/user.type';
import { Select, SelectProps } from 'antd';
import { useDebounceFn } from 'ahooks';

// useState 会触发react渲染, 逻辑上就是函数组件将会从上到下执行一遍

/**
 * 用户列表的业务hooks封装, 自动监测请求参数的变化来debounce请求接口
 * @param params, 请求参数
 */
export default function useUserList(params: IUserRequest.GetUserListParam) {
  // 接口pending状态
  const [pending, setPending] = useState(false);
  // 数据
  const [data, setData] = useState<{ items: IUser.UserType[]; total: number }>({
    items: [],
    total: 0,
  });
  // 记录请求ID, 每请求一次递增+1
  const fetchIdRef = useRef(0);
  // debounce请求的方式一
  const fetchTimer = useRef(0);

  // 请求数据
  const fetchData = async () => {
    setPending(true);
    // 清空
    setData({ items: [], total: 0 });
    // ref的赋值不会触发render, 其实相当于类组件的this.xxx的赋值
    fetchIdRef.current += 1;
    // 当前调用时 闭包中的fetchId
    const fetchId = fetchIdRef.current;
    const res = await getUserList(params);
    // 可能同时存在多个pending状态的请求, 应该将最近的请求返回的数据设置为state状态
    if (res.result && fetchId === fetchIdRef.current) {
      // 使用函数式赋值state, 是最安全的
      setData((s) => ({
        ...s,
        items: res.data.items || [],
        total: res.data.total || 0,
      }));
    }
    setPending(false);
  };
  // debounce请求方式1, 使用ahooks提供的useDebounceFn
  const fetchDataDebounceState = useDebounceFn(fetchData, { wait: 500 });
  // debounce请求方式2
  const fetchDataDebounce2 = () => {
    clearTimeout(fetchTimer.current);
    fetchTimer.current = window.setTimeout(() => {
      fetchData();
    }, 500);
  };
  // 提供一个默认的渲染Select组件
  const renderSelect = (props: SelectProps<string>) => {
    return (
      <Select loading={pending} {...props}>
        {data.items.map((item, i) => (
          <Select.Option value={item.id} title={item.name} key={i}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
  };
  // 监听参数变化, 触发请求接口
  useEffect(() => {
    fetchDataDebounceState.run();
  }, Object.values(params)); // 等效于[params.page, params.page_size, params.keyword, ...]
  // 根据id查找item
  const findItemById = (id: string) =>
    data.items.find((item) => item.id === id);
  // 返回所有的names
  const getAllNames = useMemo(() => {
    return data.items.map((item) => item.name);
  }, [data.items]);

  // 其他业务处理, 等等

  // 返回所有的状态
  return {
    pending,
    data,
    renderSelect,
    fetchDataDebounce: fetchDataDebounceState.run,
    fetchDataDebounce2,
    findItemById,
    getAllNames,
  };
}

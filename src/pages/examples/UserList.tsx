import React, { useState } from 'react';
import useUserList from '@/hooks/useUserList';
import { IUserRequest } from '@/services/user.type';
import { Table, Form, Input, Button, Popconfirm } from 'antd';
import { ColumnType } from 'antd/es/table';
import { randomSleep } from '@/utils/sleep';

function showEditUserModal(options: any) {
  // todo
}

// 未来可能变化: 1. 增加调用参数; 2. 表格增加操作功能
export default function UserList() {
  // 参数state, 当调用updateParams修改参数后, UserList会重新渲染
  const [params, updateParams] = useState<IUserRequest.GetUserListParam>({
    page: 1,
    page_size: 10,
    keyword: '',
    groupId: '',
    //...增加调用参数
  });
  // 自定义hooks, user list, 当参数发生变化, 将自动触发相关业务
  const userListState = useUserList(params);

  const handleEdit = (record: typeof userListState.data.items[0]) => {
    showEditUserModal({
      data: record,
      onSuccess: () => {
        userListState.fetchDataDebounce();
      },
    });
  };

  const handleDelete = async (record: typeof userListState.data.items[0]) => {
    await randomSleep(1,2)
    userListState.fetchDataDebounce()
  }

  const columns: ColumnType<typeof userListState.data.items[0]>[] = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'groupId',
      dataIndex: 'groupId',
    },
    {
      title: '操作',
      render: (__, record) => {
        return [
          <Button onClick={() => handleEdit(record)} type={'link'}>
            编辑
          </Button>,
          <Popconfirm title={'确认删除?'} onConfirm={() => handleDelete(record)}>
            <Button type={"link"}>删除</Button>
          </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div>
        <Form layout={'inline'}>
          <Form.Item label={'关键字'}>
            <Input.Search
              onSearch={(k) => updateParams((s) => ({ ...s, keyword: k }))}
            />
          </Form.Item>
        </Form>
        <Button
          type={'link'}
          disabled={userListState.pending}
          style={{ float: 'right' }}
          onClick={() => userListState.fetchDataDebounce()}
        >
          刷新列表
        </Button>
      </div>
      <div>
        <Table
          size={'small'}
          dataSource={userListState.data.items}
          loading={userListState.pending}
          columns={columns}
          pagination={{
            showTotal: (t) => `共${t}条`,
            total: userListState.data.total,
            current: params.page,
            pageSize: params.page_size,
            onChange: (page, pageSize) =>
              updateParams((s) => ({
                ...s,
                page,
                page_size: pageSize || s.page_size,
              })),
          }}
        />
      </div>
    </div>
  );
}

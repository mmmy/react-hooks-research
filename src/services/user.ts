import { request } from 'umi';
import { IUserRequest, IUser } from './user.type';

export async function getUserList(params: IUserRequest.GetUserListParam) {
  return request<{
    result: boolean;
    msg: string;
    data: { items: IUser.UserType[]; total: number; page: number };
  }>('/api/user/list', {
    method: 'GET',
    params,
  });
}

export async function getUserGroups() {
  return request<{
    result: boolean;
    msg: string;
    data: IUser.UserGroupType[];
  }>('/api/user/groups', {
    method: 'GET',
  })
}

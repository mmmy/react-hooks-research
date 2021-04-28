import useUserGroups from './useUserGroups';
import useUserList from './useUserList';
import { IUserRequest } from '@/services/user.type';

// 组合两个自定义hooks, 业务中也可能使用到
export default function UseUserListWidthGroup(params: Omit<IUserRequest.GetUserListParam, 'groupId'>) {
  const userGroupState = useUserGroups()
  const userListState = useUserList({ ...params, groupId: userGroupState.selectedValue })
  return {
    userGroupState,
    userListState,
  }
}


export declare namespace IUser {
  interface UserType {
    name: string
    id: string
    groupId: string
  }

  interface UserGroupType {
    id: string
    name: string
  }
}

export declare namespace IUserRequest {
  interface GetUserListParam {
    page: number
    page_size: number
    groupId: string
    keyword: string
  }

}

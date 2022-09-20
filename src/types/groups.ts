export interface IRolePeople {
  id: string
  name: string
  active: boolean
}

export interface IGroup {
  id?: string
  name?: string
  description?: string
  type?: boolean
  roles?: IRolePeople[]
  people?: IRolePeople[]
}
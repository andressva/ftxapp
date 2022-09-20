import axios from 'axios'
import { authSesion } from "../helpers/authSesion";

const axiosHttp = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "authorization": authSesion()
  }
});

export const getGroups = () => {
  return new Promise((resolve, reject) => {
    axiosHttp.get('https://demo-api-work-test.herokuapp.com/group/')
      .then((resp: any) => {
        resolve(resp.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

interface IGroupProps {
    id?: string
    name?: string
    description?: string
}

export const updateGroup = ({ id, name, description }: IGroupProps) => {
    return new Promise((resolve, reject) => {
      axiosHttp.patch(`https://demo-api-work-test.herokuapp.com/group/update/?id=${id}`, { name, description })
        .then((resp: any) => {
          resolve(resp.data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
}

export const createGroup = ({ name, description }: IGroupProps) => {
    return new Promise((resolve, reject) => {
      axiosHttp.post(`https://demo-api-work-test.herokuapp.com/group/create`, { name, description })
        .then((resp: any) => {
          resolve(resp.data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
}

export const removeGroup = ({ id }: IGroupProps) => {
  return new Promise((resolve, reject) => {
    axiosHttp.delete(`https://demo-api-work-test.herokuapp.com/group/delete/?id=${id}`)
      .then((resp: any) => {
        resolve(resp.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

interface IManageGroupProps {
    groupId?: string
    oldValues: string[]
    newValues: string[]
}

export const manageGroupMembers = ({ groupId, oldValues, newValues }: IManageGroupProps) => {
    return new Promise((resolve, reject) => {
      axiosHttp.post(`https://demo-api-work-test.herokuapp.com/group/manage-members`, { 
            groupId, 
            oldValues,
            newValues
        })
        .then((resp: any) => {
          resolve(resp.data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
}

export const manageGroupRoles = ({ groupId, oldValues, newValues }: IManageGroupProps) => {
  return new Promise((resolve, reject) => {
    axiosHttp.post(`https://demo-api-work-test.herokuapp.com/group/manage-roles`, { 
          groupId, 
          oldValues,
          newValues
      })
      .then((resp: any) => {
        resolve(resp.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
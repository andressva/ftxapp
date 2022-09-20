import React, { useState, useEffect } from 'react'
import { getGroups } from '../../services/groups'
import {
  Box,
} from '@mui/material';
import ModalGroup from './children/ModalGroup';
import { useParams } from "react-router-dom";

interface IGroup {
  id?: string
  name?: string
  description?: string
  type?: boolean
  roles?: IRolePeople[]
}

interface IRolePeople {
  id: string
  name: string
  active: boolean
}


const ManageGroup = () => {
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState<IGroup>();

  let { id } = useParams();

  useEffect(() => {
    loadGroups()
  }, [])

  const loadGroups = async () => {
    const resp: any = await getGroups();
    const current = resp.groups.find((group: IGroup) => group.id === id)
    setSelected(current)
    setGroups(resp.groups)
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
    </Box>
  )
};

export default ManageGroup;

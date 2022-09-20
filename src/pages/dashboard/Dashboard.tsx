import React, { useState, useEffect } from 'react'
import { getGroups } from '../../services/groups'
import {
  Container,
  Box,
  Grid,
} from '@mui/material';
import { TotalItems } from './children/TotalItems';
import {IGroup} from '../../types/groups'
import { Groups, Person, Work } from '@mui/icons-material';

const Dashboard = () => {

  const [groups, setGroups] = useState([]);
  const [allPeople, setAllPeople] = useState<any>([]);
  const [allRoles, setAllRoles] = useState<any>([]);

  useEffect(() => {
    loadGroups()
  }, [])

  const loadGroups = async () => {
    const resp: any = await getGroups();
    loadPeople(resp.groups)
    loadRoles(resp.groups)
    setGroups(resp.groups)
  }

  const loadPeople = (groups: IGroup[]) => {
    let lotOfPeople : any[] = []
    groups.forEach((g: any) => {
      lotOfPeople.push(...g.people)
    })

    let uniquePeople = lotOfPeople.filter((value, index, self) =>
      index === self.findIndex((t) => t.id === value.id)
    )

    setAllPeople(uniquePeople)
  }

  const loadRoles = (groups: IGroup[]) => {
    let lotOfRoles : any[] = []
    groups.forEach((g: any) => {
      lotOfRoles.push(...g.roles)
    })

    let uniqueRoles = lotOfRoles.filter((value, index, self) =>
      index === self.findIndex((t) => t.id === value.id)
    )

    setAllRoles(uniqueRoles)
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalItems label="TOTAL GROUPS" value={groups.length} color='primary.main' icon={<Groups/>} />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalItems label="TOTAL USERS" value={allPeople.length} color='warning.main' icon={<Person/>} />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalItems label="TOTAL ROLES" value={allRoles.length} color='error.main' icon={<Work/>} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Dashboard

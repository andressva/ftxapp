import React, { useState, useEffect } from 'react'
import { getGroups, createGroup, updateGroup, removeGroup, manageGroupMembers, manageGroupRoles } from '../../services/groups'
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Container,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions
} from '@mui/material';
import ModalGroup from './children/ModalGroup';
import ModalPeopleGroup from './children/ModalPeopleGroup'
import ModalRolesGroup from './children/ModalRolesGroup';
import { useNavigate } from "react-router-dom";
import { ModeEdit, Group, Work, Delete } from '@mui/icons-material';
import {IGroup, IRolePeople} from '../../types/groups'

export const GroupContext = React.createContext<any>({})

const Groups = () => {
  let navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [managePeople, setManagePeople] = useState(false);
  const [manageRoles, setManageRoles] = useState(false);
  const [groups, setGroups] = useState([]);

  const [allPeople, setAllPeople] = useState<any>();
  const [allRoles, setAllRoles] = useState<any>();
  const [selected, setSelected] = useState<IGroup>();

  const [openSuccess, setOpenSuccess] = useState(false);

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

  const handleClose = () => {
    setEditing(false)
    setCreating(false)
    setRemoving(false)
    setManagePeople(false)
    setManageRoles(false)
    setSelected(undefined)
  }

  const handleCreate = () => {
    setCreating(true);
  }

  const handleEdit = (group: any) => {
    setSelected(group);
    setEditing(true);
  }

  const handlePeople = (group: any) => {
    setManagePeople(true);
    setSelected(group)
  }

  const handleRoles = (group: any) => {
    setManageRoles(true);
    setSelected(group)
  }

  const handleRemove = (group: any) => {
    setSelected(group);
    setRemoving(true);
  }

  const onSubmit = (values: any) => {
    if(removing){
      onRemove(values);
      return
    }

    if(editing){
      onEdit(values);
      return
    }

    if(managePeople){
      onManagePeople(values)
      return
    }

    if(manageRoles){
      onManageRoles(values)
      return
    }

    onSave(values) 
  }
  
  const onEdit = async (values: any) => {
    const resp = await updateGroup({
      id: selected ? selected.id : "",
      name: values.name,
      description: values.description
    })


    setEditing(false);
    setOpenSuccess(true)
    loadGroups();
  }

  const onSave = async (values: any) => {
    const resp = await createGroup({
      name: values.name,
      description: values.description
    })

    setCreating(false);
    setOpenSuccess(true)
    loadGroups();
  }

  const onRemove = async (values: any) => {
    const resp = await removeGroup({
      id: selected ? selected.id : "",
    })

    setRemoving(false);
    setOpenSuccess(true)
    loadGroups();
  }

  const onManagePeople = async (values: any) => {
    const resp = await manageGroupMembers(values)
    setManagePeople(false)
    setOpenSuccess(true)
  }

  const onManageRoles = async (values: any) => {
    const resp = await manageGroupRoles(values)
    setManageRoles(false)
    setOpenSuccess(true)
  }


  return (
      <GroupContext.Provider 
        value={{
          allPeople,
          allRoles
        }}
      >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      > 
        <ModalGroup 
          open={editing || creating} 
          editing={editing}
          handleClose={handleClose} 
          group={selected} 
          onSubmit={onSubmit} />
        <ModalPeopleGroup 
          open={managePeople}
          handleClose={handleClose}
          group={selected} 
          onSubmit={onSubmit} />
        <ModalRolesGroup 
          open={manageRoles}
          handleClose={handleClose}
          group={selected} 
          onSubmit={onSubmit} />
        <Container maxWidth={false}>
          <Box>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
              }}
            >
              <Typography
                sx={{ m: 1 }}
                variant="h4"
              >
                Groups
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleCreate}
                >
                  Create Group
                </Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
          <Card>
            <PerfectScrollbar>
              <Box sx={{ minWidth: 1050 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Name
                      </TableCell>
                      <TableCell>
                        Description
                      </TableCell>
                      <TableCell>Edit</TableCell>
                      <TableCell>People</TableCell>
                      <TableCell>Roles</TableCell>
                      <TableCell>Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groups.map((group: any) => (
                      <TableRow
                        hover
                        key={group.id}
                      >
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            <Typography
                              color="textPrimary"
                              variant="body1"
                            >
                              {group.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            <Typography
                              color="textPrimary"
                              variant="body1"
                            >
                              {group.description}
                            </Typography>
                          </Box>
                          
                        </TableCell>
                        <TableCell>
                          <Box
                              sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            <IconButton 
                              aria-label="edit"
                              color="primary"
                              onClick={() => handleEdit(group)}
                            >
                              <ModeEdit />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            aria-label="people"
                            color="primary"
                            onClick={() => handlePeople(group)}
                          >
                            <Group />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            aria-label="roles"
                            color="primary"
                            onClick={() => handleRoles(group)}
                          >
                            <Work />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            aria-label="roles"
                            color="primary"
                            onClick={() => handleRemove(group)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
          </Card>
          </Box>
          <Dialog
            open={removing}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to remove it?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This procedure is irreversible
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={onSubmit} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
        <Snackbar open={openSuccess} onClose={() => setOpenSuccess(false)} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Operación exitosa!
          </Alert>
        </Snackbar>
      </Box>
      </GroupContext.Provider>
  )
};

export default Groups;

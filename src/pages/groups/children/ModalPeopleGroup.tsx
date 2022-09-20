import React, { useState, useEffect, useContext } from 'react'
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
  Modal,
  TableContainer,
  IconButton
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ModalSelect from './ModalSelect';

import { Delete } from '@mui/icons-material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IOwnProps {
  open: boolean
  group: any
  handleClose: () => void
  onSubmit: Function
}

interface MyFormValues {
  name: string
  description: string
}

const ModalManageGroup = ({
  open,
  group,
  handleClose,
  onSubmit }: IOwnProps) => {

  const [people, setPeople] = useState([]);

  const [showPeople, setShowPeople] = useState(false)

  useEffect(() => {
    if(!group) return
    const tempPeople = group.people
    setPeople(tempPeople)
  }, [group])

  const handleRemove = (inPeople: any) => {
    const tempPeople = people.filter((p: any) => p.id !== inPeople.id)
    setPeople(tempPeople)
  }

  const handleAdd = () => {
    setShowPeople(true);
  }

  const onAdd = (values: any) => {
    const tmpPeople = [...people]
    tmpPeople.push(...values)
    setShowPeople(false)
    setPeople(tmpPeople)
  }

  const handleSubmit = async () => {
    const data = {
      groupId: group.id,
      oldValues: group.people.map((p: any) => p.id),
      newValues: people.map(p => p.id)
    }
    onSubmit(data)
  }

  return (
    <>
    <ModalSelect 
      open={showPeople}
      handleClose={() => setShowPeople(false)}
      groupPeople={people}
      onSubmit={onAdd}
    />
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={style}>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            {group?.name}
          </Typography>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              padding: '10px',
            }}
          >
            <Typography
              sx={{ m: 1, fontWeight: 'bold' }}
              variant="h4"
            >
              People
            </Typography>
            <Box sx={{ m: 1 }}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleAdd}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
        <Card>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Name
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group && people.map((p: any) => (
                    <TableRow
                      hover
                      key={p.id}
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
                            {p.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          aria-label="delete"
                          color="primary"
                          onClick={() => handleRemove(p)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Box>
          </PerfectScrollbar>
        </Card>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '40px 0',
          }}
        >
          <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              sx={{
                width: '40%'
              }}
            >
              Submit
          </Button>
        </Box>
      </Box>
    </Modal>
    </>
  )
}

export default ModalManageGroup

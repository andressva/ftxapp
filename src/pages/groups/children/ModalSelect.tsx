import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Modal,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { GroupContext } from '../Groups';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IOwnProps {
  open: boolean
  group?: any
  groupPeople?: any
  handleClose: () => void
  onSubmit: Function
}

interface MyFormValues {
  name: string
  description: string
}

const ModalSelect = ({
  open,
  groupPeople,
  handleClose,
  onSubmit }: IOwnProps) => {
  const [selectedPeopleIds, setSelectedPeopleIds] = useState([]);
  const { allPeople } = useContext(GroupContext)
  const [validPeople, setValidPeople] = useState([]);

  useEffect(() => {
    if (!groupPeople || !allPeople) return
    const currentPeople = groupPeople.map((p: any) => p.id)
    const newPeople = allPeople.filter((p: any) => !currentPeople.includes(p.id))
    setValidPeople(newPeople)
  }, [groupPeople])


  const handleSelectAll = (event: any) => {
    let newSelectedPeopleIds;

    if (event.target.checked) {
      newSelectedPeopleIds = validPeople.map((people: any) => people.id);
    } else {
      newSelectedPeopleIds = [];
    }

    setSelectedPeopleIds(newSelectedPeopleIds);
  };

  const handleSelectOne = (event: any, id: any) => {
    const selectedIndex = selectedPeopleIds.indexOf(id);
    let newSelectedPeopleIds: any[] = [];

    if (selectedIndex === -1) {
      newSelectedPeopleIds = newSelectedPeopleIds.concat(selectedPeopleIds, id);
    } else if (selectedIndex === 0) {
      newSelectedPeopleIds = newSelectedPeopleIds.concat(selectedPeopleIds.slice(1));
    } else if (selectedIndex === selectedPeopleIds.length - 1) {
      newSelectedPeopleIds = newSelectedPeopleIds.concat(selectedPeopleIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedPeopleIds = newSelectedPeopleIds.concat(
        selectedPeopleIds.slice(0, selectedIndex),
        selectedPeopleIds.slice(selectedIndex + 1)
      );
    }

    setSelectedPeopleIds(newSelectedPeopleIds);
  };

  const handleSubmit = () => {
    const selectedPeople = validPeople.filter((p: any) => selectedPeopleIds.includes(p.id))
    onSubmit(selectedPeople)
  }


  return (
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
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
              Customers
            </Typography>
            <Box sx={{ m: 1 }}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Add Selected
              </Button>
            </Box>
          </Box>
        </Box>
        <Card>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedPeopleIds.length === validPeople.length}
                        color="primary"
                        indeterminate={
                          selectedPeopleIds.length > 0
                          && selectedPeopleIds.length < validPeople.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>
                      Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {validPeople && validPeople.map((p: any) => (
                    <TableRow
                      hover
                      key={p.id}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedPeopleIds.indexOf(p.id) !== -1}
                          onChange={(event) => handleSelectOne(event, p.id)}
                          value="true"
                        />
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
                            {p.name}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </Card>
      </Box>
    </Modal>
  )
}

export default ModalSelect

import type { UserAccount } from 'src/models/UserAccount';

import * as z from 'zod';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { UserTableToolbar } from '../user-table-toolbar';
import { TableEmptyRows } from '../user-table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { getMemberships } from '../../services/MembershipService';
import { ActiveMembership } from '../../../models/ActiveMembership';
import { ActiveMembershipCreationDTO } from '../../../models/ActivateMembershipCreationDTO';
import { getMembers, createActiveMembership, updateActiveMembership } from '../../services/UserService';

import type { ActiveMembershipProps} from '../user-table-row';
import type {MembershipModel} from "../../../models/MembershipModel";

// ----------------------------------------------------------------------

export function UserView() {

  // eslint-disable-next-line @typescript-eslint/no-shadow
    function useTable() {
    const [page, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState('name');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState<string[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  
    const onSort = useCallback(
      (id: string) => {
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      },
      [order, orderBy]
    );
  
    const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
      setSelected(checked ? newSelecteds : []);
    }, []);
  
    const onSelectRow = useCallback(
      (inputValue: string) => {
        setSelected((prev) =>
          prev.includes(inputValue) ? prev.filter((value) => value !== inputValue) : [...prev, inputValue]
        );
      },
      []
    );
  
  
  
    const onResetPage = useCallback(() => setPage(0), []);
    const onChangePage = useCallback((event: unknown, newPage: number) => setPage(newPage), []);
    const onChangeRowsPerPage = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        onResetPage();
      },
      [onResetPage]
    );
    
  
  
    return { page, order, onSort, orderBy, selected, rowsPerPage, onSelectRow, onResetPage, onChangePage, onSelectAllRows, onChangeRowsPerPage };
  }


  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [notFoundTrigger, setNotFoundTrigger] = useState(false);
  const [modifiedId, setModifiedId] = useState<number | null>(null);
  const [updatedUserProfile, setUpdatedUserProfile] = useState<UserAccount | null>(null);
  const [dataFiltered, setDataFiltered] = useState<ActiveMembershipProps[]>();
  const [_users, setUsers] = useState<ActiveMembership[]>([]);
  const [memberships, setMemberships] = useState<MembershipModel[]>([]);
  const [selectedMembership, setSelectedMembership] = useState<MembershipModel | null>(null);

  const schema = z.object({
    id: z.number().optional(),
    membershipId: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    birthday: z.union([z.string(), z.date()]),
    weight: z.number(),
    height: z.number(),
    location: z.string(),
    phone: z.string(),
    gender: z.string(),
    startDate: z.union([z.string(), z.date()]),
    endDate: z.union([z.string(), z.date()]),
    note: z.string().optional(),
    status: z.string().optional(),
    available: z.boolean(),
  });

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues:{
      available:true,
      gender: "Male"
    }
  });
  

  // Sync selected membership with form state
  useEffect(() => {
    if (selectedMembership) {
      setValue('membershipId', selectedMembership.id);
    }
  }, [selectedMembership, setValue]);

  const handleClose = () => {
    setOpen(false);
    setModifiedId(null);
    setSelectedMembership(null);
    reset();
  };

  // Add New Member handler
  const handleOpenAdd = async () => {
    setModifiedId(-1);
    reset();

    try {
      const response = await getMemberships();
      if (response.status) {
        setMemberships(response.data);
        setSelectedMembership(null);
      } else {
        handleClose();
        alert(response.displayMsg);
      }
    } catch (error) {
      console.error('Error fetching memberships:', error);
    }

    setOpen(true);
  };

  // Edit Member handler
  useEffect(() => {
    const loadUserDataAndOpenDialog = async () => {
      if (modifiedId && modifiedId !== -1) {
        const userToEdit = _users.find((user) => user.id === modifiedId);
        if (userToEdit) {
          const formattedUser = {
            ...userToEdit,
            startDate: userToEdit.startDate?.toISOString().split('T')[0] || '',
            endDate: userToEdit.endDate?.toISOString().split('T')[0] || '',
            email: userToEdit.user.email,
            firstName: userToEdit.user.firstName,
            lastName: userToEdit.user.lastName,
            birthday: userToEdit.user.birthday?.toISOString().split('T')[0] || '',
            weight: userToEdit.user.weight,
            height: userToEdit.user.height,
            location: '',
            phone: userToEdit.user.phone,
            gender: userToEdit.user.gender,
            note: userToEdit.note,
            status: userToEdit.status,
            available: userToEdit.available,
            membershipId: userToEdit.membership.id,
          };

          reset(formattedUser);

          try {
            const response = await getMemberships();
            if (response.status) {
              setMemberships(response.data);
              const userMembership = response.data.find((m) => m.id === userToEdit.membership.id);
              if (userMembership) {
                setSelectedMembership(userMembership);
                setValue('membershipId', userMembership.id);
              }
            }
          } catch (error) {
            console.error('Error fetching memberships:', error);
          }

          setOpen(true);
        }
      }
    };

    loadUserDataAndOpenDialog();
  }, [modifiedId, _users, reset, setValue,updatedUserProfile]);

  const handleSubmitForm = async (data: any) => {
    try {
      if (!selectedMembership) {
        alert('Please select a valid membership');
        return;
      }

      if (!selectedMembership) {
        alert('Please select a valid membership');
        return;
      }

      if (modifiedId === -1) {
        // Create new membership
        const activeMembershipCreationDto = new ActiveMembershipCreationDTO({
      // id:  undefined,
         membershipId: selectedMembership.id,
         gymId:1,
         email: data.email,
         firstName: data.firstName,
         lastName: data.lastName,
         birthday: new Date(data.birthday),
         location: data.location,
         phone: data.phone,
         gender: data.gender,
         price:selectedMembership.price,
         paymentPercent:100,
         startDate: new Date(data.startDate),
         endDate: new Date(data.endDate),
         note: data.note,
         status: data.status,
        } );



        console.log(activeMembershipCreationDto);

        const result = await createActiveMembership(activeMembershipCreationDto);
        console.log(result);
        if (result.status) {
          console.log(result.status);
          handleClose();
          await loadData();
        }
      } else {
        // Update existing membership

        console.log("selected Membership");
        console.log(selectedMembership);
        console.log("selectedMembershipId");
        console.log(data.membershipId);
        const newMembership = memberships.find((m) => m.id === selectedMembership.id);
        const updatedMembership = new ActiveMembership({
            id: modifiedId ?? -1,
            membership: selectedMembership,
            user: updatedUserProfile || data.user,
            startDate:new Date(data.startDate),
            endDate:new Date(data.endDate),
            price:selectedMembership.price,
            paymentPercent:100,
            available:data.available,
            createdAt:new Date(),
            updatedAt:new Date(),
            note:data.note,
            status:data.status
      });
        console.log("update membership");
        console.log(updatedMembership);

        const result = await updateActiveMembership(updatedMembership);
        if (result.status) {
          handleClose();
          await loadData();
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const loadData = useCallback(async () => {
    const res = await getMembers();
    if (res.status) {
      setNotFoundTrigger(false)
      setUsers(res.data);
      setDataFiltered(applyFilter({
        inputData: res.data!.map(m => m.toActiveMembershipProps()),
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      }));
    }else{
      setUsers([]);
      setNotFoundTrigger(true)
    }
  }, [filterName, table.order, table.orderBy]); // ✅ Dependencies are properly managed

  useEffect(() => {
    loadData();
  }, [filterName, loadData, table.order, table.orderBy]); // ✅ No more infinite re-renders

  const updateData = (id: string) => {
    setModifiedId(Number(id));
    const selectedMem = _users.find((user) => user.id.toString() === id);
    if (selectedMem) {
      const account= _users.find((user) => user.id.toString() === id);
      console.log("the selected account is",account)
      setUpdatedUserProfile(account?.user!);
    }
  };



  return (
    <DashboardContent>

      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Members
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpenAdd}
        >
          Add New Member
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {modifiedId && modifiedId !== -1 ? 'Update Member' : 'Add New Member'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div style={{ marginBottom: '10px' }}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Membership</label>
              <Select
                options={memberships}
                value={selectedMembership}
                onChange={setSelectedMembership}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option.id.toString()}
                placeholder="Select Membership..."
                isSearchable
              />
            </div>

            <input
              type="hidden"
              {...register('membershipId')}
              value={selectedMembership?.id || ''}
            />

            {/* Show these fields only when adding new member */}
            {modifiedId === -1 && (
              <>
                <TextField label="First Name" fullWidth margin="dense" {...register('firstName')} />
                <TextField label="Last Name" fullWidth margin="dense" {...register('lastName')} />
                <TextField label="Email" fullWidth type="email" margin="dense" {...register('email')} />
                <TextField
                  label="Birthday"
                  fullWidth
                  margin="dense"
                  type="date"
                  {...register('birthday')}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Weight"
                  fullWidth
                  margin="dense"
                  type="number"
                  {...register('weight', { valueAsNumber: true })}
                />
                <TextField
                  label="Height"
                  fullWidth
                  margin="dense"
                  type="number"
                  {...register('height', { valueAsNumber: true })}













                />
                <TextField label="Location" fullWidth margin="dense" {...register('location')} />
                <TextField label="Phone" fullWidth margin="dense" {...register('phone')} />
                <div style={{ marginBottom: '10px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>Gender</label>
                  <Select
                    options={[
                      { value: 'MALE', label: 'Male' },
                      { value: 'FEMALE', label: 'Female' },














                      
                    ]}











                    onChange={(selectedOption) => setValue('gender', selectedOption?.value!)}
                    placeholder="Select Gender..."
                  />
                </div>
              </>
            )}

            {/* Always show these fields */}
            <TextField
              label="Start Date"
              fullWidth
              margin="dense"
              type="date"
              {...register('startDate')}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              fullWidth
              margin="dense"
              type="date"
              {...register('endDate')}
              InputLabelProps={{ shrink: true }}
            />
            <TextField label="Note" fullWidth margin="dense" {...register('note')} />
            <TextField label="Status" fullWidth margin="dense" {...register('status')} />
            <TextField
              type="checkbox"
              label="Available"
              fullWidth
              margin="dense"
              {...register('available')}
            />

            <DialogActions>
              <Button
                className="bg-red-700 hover:bg-red-800 min-w-[250px] min-h-[40px]"
                onClick={(event) => console.log(errors)}
              >
                DEBUG
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users?.map((user) => user.id.toString())
                  )
                }
                headLabel={[

                  { id: 'user.firstName', label: 'Name', width: '20%' },
                  { id: 'membership.title', label: 'Membership', width: '20%' },
                  { id: 'startDate', label: 'Start at', width: '20%' },
                  { id: 'endDate', label: 'End at', width: '20%' },
                  { id: 'status', label: 'Status', width: '20%' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  ?.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                      onSelectRow={() => table.onSelectRow(row.id.toString())}
                      updateData={updateData}
                      onDeleteSuccess={loadData} // Add this line
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                />

                {notFoundTrigger && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    setSelected(checked ? newSelecteds : []);
  }, []);

  const onSelectRow = useCallback((inputValue: string) => {
    setSelected((prev) =>
      prev.includes(inputValue)
        ? prev.filter((value) => value !== inputValue)
        : [...prev, inputValue]
    );
  }, []);

  const onResetPage = useCallback(() => setPage(0), []);
  const onChangePage = useCallback((event: unknown, newPage: number) => setPage(newPage), []);
  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}

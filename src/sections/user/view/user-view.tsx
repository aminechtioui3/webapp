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
import {getSelectedGymFromCookies} from "../../services/GymService";

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
  // Add these constants at the top of the file
  const NEW_THRESHOLD_PERCENT = 7; // 7% of total duration
  const END_SOON_THRESHOLD_PERCENT = 85; // 85% of total duration

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  const defaultGymModel = (() => {
    try {
      const gymModel = getSelectedGymFromCookies();
      if (gymModel) {
        return gymModel.id;
      }
    } catch (e) {
      console.error("Error parsing selectedGymModel:", e);
    }
    return -1; // fallback value
  })();

  const schema = z.object({
    id: z.number().optional(),
    membershipId: z.number(),
    gymId:z.number().default(defaultGymModel),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    gender: z.string().default("Male"),
    startDate: z.union([z.string(), z.date()]),
    endDate: z.union([z.string(), z.date()]),
    price: z.number(),
    paymentPercent:z.number(),
    note: z.string().optional(),
    status: z.string().optional(),

  });

  const {
    reset,
    register,
    handleSubmit,
    setValue,
      watch,
    formState: { errors ,dirtyFields },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues:{
      gender: "Male",
      gymId:defaultGymModel,
      paymentPercent:0
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


  // Add these useEffects
  useEffect(() => {
    // Set default dates when adding new member
    if (modifiedId === -1) {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 30);

      setValue('startDate', today.toISOString().split('T')[0]);
      setValue('endDate', endDate.toISOString().split('T')[0]);
    }
  }, [modifiedId, setValue]);

// Update the price handling effect
  useEffect(() => {
    if (selectedMembership) {
      // For new memberships, always use selected membership price
      if (modifiedId === -1) {
        setValue('price', Number(selectedMembership.price));
      }
          // For existing memberships, only update price if:
          // 1. The user hasn't manually modified the price
      // 2. The selected membership is different from the original
      else {
        const originalUser = _users.find(u => u.id === modifiedId);
        const originalMembership = originalUser?.membership;

        if (originalMembership?.id !== selectedMembership.id) {
          const isPriceDirty = Object.keys(dirtyFields).includes('price');
          if (!isPriceDirty) {
            setValue('price', Number(selectedMembership.price));
          }
        }
      }
    }
  }, [selectedMembership, modifiedId, dirtyFields, _users, setValue]);
  // Edit Member handler
  useEffect(() => {
    const loadUserDataAndOpenDialog = async () => {
      if (modifiedId && modifiedId !== -1) {
        const userToEdit = _users.find((user) => user.id === modifiedId);
        if (userToEdit) {
          const formattedUser = {
            ...userToEdit,
            startDate: userToEdit.startDate
                ? new Date(userToEdit.startDate).toISOString().split('T')[0]
                : '',
            endDate: userToEdit.endDate
                ? new Date(userToEdit.endDate).toISOString().split('T')[0]
                : '',
            email: userToEdit.user.email,
            firstName: userToEdit.user.firstName,
            lastName: userToEdit.user.lastName,
            birthday: userToEdit.user.birthday?.toISOString().split('T')[0] || '',
            weight: userToEdit.user.weight,
            height: userToEdit.user.height,
            price: userToEdit.price, // Add this line

            paymentPercent:userToEdit.paymentPercent,
            location: '',
            phone: userToEdit.user.phone,
            gender: userToEdit.user.gender,
            note: userToEdit.note,
            status: userToEdit.status,
            available: userToEdit.available,
            membershipId: userToEdit.membership.id,
          };

          reset(formattedUser);
          setValue('price', userToEdit.price); // This ensures the price is correctly populated


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
         gymId:getSelectedGymFromCookies().id??-1,
         email: data.email,
         firstName: data.firstName,
         lastName: data.lastName,

         phone: data.phone,
         gender: data.gender,
         price:data.price,
         paymentPercent:data.paymentPercent,
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
        const updatedMembership = new ActiveMembership({
            id: modifiedId ?? -1,
            membership: selectedMembership,
            user: updatedUserProfile || data.user,
            startDate:new Date(data.startDate),
            endDate:new Date(data.endDate),
            price:data.price,
            paymentPercent:data.paymentPercent,
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
// Replace the existing calculateStatus function with this:
  const calculateStatus = (startDate: Date, endDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Handle invalid date ranges
    if (end < start) return { status: 'Invalid Date', color: 'black' };

    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const elapsedDays = Math.ceil((today.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const elapsedPercentage = (elapsedDays / totalDays) * 100;

    if (today < start) return { status: 'Not Active Yet', color: 'grey' };
    if (today > end) return { status: 'Expired', color: 'red' };

    // New status calculation
    if (elapsedPercentage <= NEW_THRESHOLD_PERCENT) {
      return { status: 'New', color: 'blue' };
    }

    // End soon calculation
    if (elapsedPercentage >= END_SOON_THRESHOLD_PERCENT) {
      return { status: 'End Soon', color: 'orange' };
    }

    return { status: 'Active', color: 'green' };
  };
// Add this status update useEffect
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    if (startDate && endDate) {
      const { status } = calculateStatus(new Date(startDate), new Date(endDate));
      setValue('status', status);
    }
  }, [startDate, endDate, setValue]);



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

                <TextField label="Phone" fullWidth margin="dense" {...register('phone')} />
                <div style={{ marginBottom: '10px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>Gender</label>

                  <Select
                      options={genderOptions}
                      value={genderOptions.find(option => option.value === watch('gender'))}
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
                value={watch('startDate') || ''}
                onChange={(e) => setValue('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
            />

            <TextField
                label="End Date"
                fullWidth
                margin="dense"
                type="date"
                value={watch('endDate') || ''}
                onChange={(e) => setValue('endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
            />
            <TextField
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
                value={watch("price") ?? ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setValue("price", Number.isNaN(value) ? 0 : value);
                }}
                inputProps={{
                  step: "0.01" // Allows decimal values
                }}
            />


            <TextField
                {...register("paymentPercent", { valueAsNumber: true })}
                margin="dense"
                label="Avance"
                type="number"
                fullWidth
                error={!!errors.paymentPercent}
                helperText={errors.paymentPercent?.message}
            />
            <TextField label="Note" fullWidth margin="dense" {...register('note')} />

            <TextField
                label="Status"
                fullWidth
                margin="dense"
                value={watch('status') || ''}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: startDate && endDate
                            ? calculateStatus(new Date(startDate), new Date(endDate)).color
                            : 'transparent',
                        marginLeft: 1
                      }} />
                  ),
                }}
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

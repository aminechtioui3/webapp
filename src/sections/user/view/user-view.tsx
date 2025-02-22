import type { UserAccount } from 'src/models/UserAccount';
import Select from "react-select";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import {getUsers, startMembership} from 'src/sections/services/UserService';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';
import api from "../../../api/axiosConfig";
import {getMemberships} from "../../services/MembershipService";
import {ActiveMembership} from "../../../models/ActiveMembership";

// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [dataFiltered, setDataFiltered] = useState<UserProps[]>();
  const [_users, setUsers] = useState<ActiveMembership[]>([]);
  const [memberships, setMemberships] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const handleClose = () =>(setOpen(false));
  const PriceSelectionTable=()=>{
    const prices = [10, 20, 30, 50, 75, 100, 150, 200]; // Pricing options
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [customField, setCustomField] = useState("default");
    
  }

  const handleOpen = async () => {
    async function fetchMemberships() {
      try {
        const response = await getMemberships();
        if (response.status) {
          const membershipOptions = response.data!.map((membership) => ({
            value: membership.id,
            label: membership.title, // Display the name
          }));
          setMemberships(membershipOptions);
        }else{
          alert(response.displayMsg)
        }

      } catch (error) {
        console.error("Error fetching memberships:", error);
      }
    }
    fetchMemberships();

    setOpen(true);

  };
  const schema = z.object({
    id: z.number().optional(),
    membershipId: z.number().optional(),
    email: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    birthday: z.string().optional(),
    weight: z.number().optional(),
    height: z.number().optional(),
    location: z.string().optional(),
    phone: z.string().optional(),
    gender: z.string().optional(),
    endDate: z.union([z.string(), z.date()]).optional(),
    startDate: z.union([z.string(), z.date()]).optional(),
    note: z.string().optional(),
    status: z.string().optional(),
  });


  const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
      });

      const  onSubmit  = async (data :any) =>  {
        console.log("Form submitted: ", data);

        let res= await startMembership(data);

        if (res.status){
          alert("done");
           handleClose();
        }else{
           alert("error");
        }
       
      };
  
  useEffect(() => {
    (async function loadData(){
      const users =  await getUsers();

      if (users.status){
        setUsers(users.data!);
        console.log(users);
        setDataFiltered(applyFilter({
          inputData: users.data!.map(user => user.toUserProps()),
          comparator: getComparator(table.order, table.orderBy),
          filterName,
        }));
      }else{
        // notify admin
        setUsers([]);
      }
    })();
    
  }, [filterName, table.order, table.orderBy]);

  const notFound = dataFiltered && dataFiltered!.length && !!filterName;

  const handleMembershipChange = (selectedOption) => {
    setSelectedMembership(selectedOption);
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
          onClick={handleOpen}
        >
          Add New Member
        </Button>
      </Box>

      {/* User Form Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Member</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: '10px' }}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Membership</label>
              <Select
                options={memberships}
                value={selectedMembership}
                onChange={handleMembershipChange}
                placeholder="Select Membership..."
                isSearchable
              />
            </div>

            {/* Hidden input to store membershipId */}
            <input
              type="hidden"
              {...register('membershipId')}
              value={selectedMembership?.value || ''}
            />

            <TextField
              label="Email"
              fullWidth
              margin="dense"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="First Name"
              fullWidth
              margin="dense"
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="dense"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
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
              {...register('weight')}
            />
            <TextField
              label="Height"
              fullWidth
              margin="dense"
              type="number"
              {...register('height')}
            />

            <TextField label="Location" fullWidth margin="dense" {...register('location')} />
            <TextField label="Phone" fullWidth margin="dense" {...register('phone')} />
            <TextField label="Gender" fullWidth margin="dense" {...register('gender')} />

            {/* Fix startDate and endDate */}
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

            <DialogActions>
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
                    _users?.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name', width: '33%' },
                  { id: 'role', label: 'Subscription type', width: '33%' },
                  { id: 'status', label: 'Status', width: '33%' },
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
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
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

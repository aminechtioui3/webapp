import type { UserAccount } from 'src/models/UserAccount';

import * as z from "zod";
import {Controller, useForm} from "react-hook-form";
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

import Select from "react-select";
import { TableNoData } from '../table-no-data';
import { ExpenseTableRow } from '../expense-table-row';
import { ExpenseTableHead } from '../expense-table-head';
import { TableEmptyRows } from '../expense-table-empty-rows';
import { ExpenseTableToolbar } from '../expense-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../expense-table-row';

// ----------------------------------------------------------------------

export function ExpenseView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [dataFiltered, setDataFiltered] = useState<UserProps[]>();
  const [_users, setUsers] = useState<UserAccount[]>([]);
  const handleOpen = async () => {setOpen(true)};
  const handleClose = () =>(setOpen(false));
  const [selectedType, setSelectedType] = useState("OTHERS");
  const PriceSelectionTable=()=>{
    const prices = [10, 20, 30, 50, 75, 100, 150, 200]; // Pricing options
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [customField, setCustomField] = useState("default");
    
  }


const schema = z.object({
  note: z.string().optional(),
  type: z.string(),
  date: z.string().date(),
  amount: z.number(),
});
      const {
        control,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
      });

      const  onSubmit  = async (data :any) =>  {
        console.log("Form submitted: ", data);
        let res=false;
        res= await startMembership(data);
        if (res){
          alert("done");
           handleClose();
        }else{
           alert("error");
        }
       
      };
  
  useEffect(() => {
    (async function loadData(){
      const users =  await getUsers(); 
      setUsers(users);
      console.log(users);
      setDataFiltered(applyFilter({
        inputData: users.map(user => user.toUserProps()),
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      }));
    })();
    
  }, [filterName, table.order, table.orderBy]);

  const notFound = dataFiltered && dataFiltered!.length && !!filterName;

  const options = [
    { value: 'EQUIPMENTS', label: 'EQUIPMENTS' },
    { value: 'BILLS', label: 'BILLS' },
    { value: 'SALARY', label: 'SALARY' },
    { value: 'FIX', label: 'FIX' },
    { value: 'OTHERS', label: 'OTHERS' }
  ];

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Expenses
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpen}
        >
          Add New Expense
        </Button>
        {}
      </Box>

      <p>In this page you will find all the Expenses you declare</p>
      <br />

      {/* User Form Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Date"
              fullWidth
              margin="dense"
              type="date"
              {...register('date')}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register('amount', { valueAsNumber: true })}
              margin="dense"
              label="Amount"
              type="number"
              fullWidth
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />

            <div>
              <label>Type</label>
              <Controller
                name="type" // Bind to the "type" field in the form
                control={control} // Use the control from react-hook-form
                defaultValue={selectedType} // Set default value
                render={({ field }) => (
                  <Select
                    {...field} // Spread the field props (including onChange, value)
                    options={options}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption?.value); // Update field value
                      setSelectedType(selectedOption?.value); // Update the selectedType state
                    }}
                    placeholder={selectedType != null ? selectedType : "Select Type."}
                    isSearchable
                  />
                )}
              />
              {errors.type && <p style={{ color: 'red' }}>{errors.type.message}</p>}
            </div>

            <TextField
              label="note"
              fullWidth
              margin="dense"
              {...register('note')}
              error={!!errors.note}
              helperText={errors.note?.message}
            />

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
        <ExpenseTableToolbar
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
              <ExpenseTableHead
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
                  { id: 'image', label: 'Image', width: '10%' },
                  { id: 'name', label: 'Name', width: '20%' },
                  { id: 'price', label: 'Price', width: '20%' },
                  { id: 'description', label: 'description', width: '20%' },
                  { id: 'status', label: 'Status', width: '10%' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  ?.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ExpenseTableRow
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

import { UserAccount } from 'src/models/UserAccount';
import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import {getUsers} from 'src/sections/services/UserService';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { UserProps } from '../user-table-row';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";



// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [dataFiltered, setDataFiltered] = useState<UserProps[]>();
  const [_users, setUsers] = useState<UserAccount[]>([]);
  const handleOpen = async () => {setOpen(true)};
  const handleClose = () =>(setOpen(false));
  const PriceSelectionTable=()=>{
    const prices = [10, 20, 30, 50, 75, 100, 150, 200]; // Pricing options
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [customField, setCustomField] = useState("default");
    
  }
  const schema = z.object({
    title: z.string().min(1, "Title is required"),
    subTitle: z.string().min(1, "Subtitle is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().optional(),
    price: z.string().min(1, "Price is required"),
    available: z.boolean(),
  });
  
  export default function AddNewItemDialog({ open: string , handleClose }) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
    });
  
    const onSubmit = (data) => {
      console.log("Form submitted: ", data);
      handleClose();
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
    
  }, []);

  const notFound = dataFiltered && dataFiltered!.length && !!filterName;
  
  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Subscriptions
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpen}
        >
         Add New Member
        </Button>
        {/* tableau
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Select</th>
            <th className="border border-gray-300 px-4 py-2">Price (Dinars)</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">
                <input
                  type="radio"
                  name="price"
                  value={price}
                  checked={selectedPrice === price}
                  onChange={() => setSelectedPrice(price)}
                  className="w-4 h-4"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {price} Dinars
              </td>
            </tr>
          ))}
        </tbody>
      </table>

         */}
      </Box>
      
      {/* User Form Modal */}
      
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Title" fullWidth margin="dense" {...register("title")} error={!!errors.title} helperText={errors.title?.message} />
          <TextField label="Subtitle" fullWidth margin="dense" {...register("subTitle")} error={!!errors.subTitle} helperText={errors.subTitle?.message} />
          <TextField label="Description" fullWidth margin="dense" {...register("description")} error={!!errors.description} helperText={errors.description?.message} />
          <TextField label="Image URL" fullWidth margin="dense" {...register("image")} error={!!errors.image} helperText={errors.image?.message} />
          <TextField label="Price" fullWidth margin="dense" {...register("price")} error={!!errors.price} helperText={errors.price?.message} />
          <Box sx={{ width: 300, mt: 2 }}>
            <Typography variant="h6">Available</Typography>
            <input type="checkbox" {...register("available")} />
          </Box>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
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
                {dataFiltered?.slice(
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

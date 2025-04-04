import type { UserAccount } from 'src/models/UserAccount';

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



import { TableNoData } from '../table-no-data';
import { SessionTableRow } from '../session-table-row';
import { SessionTableHead } from '../session-table-head';
import { TableEmptyRows } from '../session-table-empty-rows';
import { SessionTableToolbar } from '../session-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { SessionProps } from '../session-table-row';


import {SessionModel} from "../../../models/SessionModel";
import {createSession, getAllSessions, updateSession} from "../../services/SessionService";


// ----------------------------------------------------------------------

export function SessionView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [notFoundTrigger, setNotFoundTrigger] = useState(false);
  const [dataFiltered, setDataFiltered] = useState<SessionProps[]>();
  const [modifiedId, setModifiedId] = useState<number>(-1);
  const [_sessions, setSessions] = useState<SessionModel[]>([]);
  const handleOpen = async () => {setOpen(true)};
  const handleClose = () =>(setOpen(false));
  const PriceSelectionTable=()=>{
    const prices = [10, 20, 30, 50, 75, 100, 150, 200]; // Pricing options
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [customField, setCustomField] = useState("default");
    
  }



const schema = z.object({

  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  available: z.boolean(),
  
});
  const {
    register,
    handleSubmit,
    reset, // <-- Add reset here
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const updateData = async (id: string) => {
    const userToEdit = _sessions.find(user => user.id.toString() === id.toString()); // Find user by ID

    setModifiedId(Number.parseInt(id, 10));
    if (userToEdit) {
      reset(userToEdit); // Populate form fields with user data
      handleOpen(); // Open the form modal
    }
  };




  const onSubmit = async (data: any) => {
    console.log("Form submitted: ", data);

    if (modifiedId === -1) {
      // Create new membership
      const result = await createSession(SessionModel.fromJson(data));
      console.log(result);

      if (result.status) {
        handleClose();
        await loadData(); // ✅ Reload data after successful creation
      } else {
        console.log(result);
      }
    } else {
      // Update existing membership
      const m = new SessionModel({
       id: modifiedId,
       title: data.title,
       subTitle: data.subTitle,
       description: data.description,
       available: data.available,
       image: data.image,
       createdAt: new Date(),
       updatedAt: new Date(),
      });

      const result = await updateSession(m);
      console.log(result);

      if (result.status) {
        handleClose();
        await loadData(); // ✅ Reload data after successful update
      } else {
        console.log(result);
      }
    }
  };

  const loadData = useCallback(async () => {
    const memberships = await getAllSessions();
    console.log(memberships);

    if (memberships.status) {
      setSessions(memberships.data!);
      setDataFiltered(applyFilter({
        inputData: memberships.data!.map(m => m.toSessionProps()),
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      }));
    } else {
      setNotFoundTrigger(true)
      setSessions([]);
    }
  }, [filterName, table.order, table.orderBy]); // ✅ Dependencies are properly managed

  useEffect(() => {
    loadData();
  }, [filterName, loadData, table.order, table.orderBy]); // ✅ No more infinite re-renders

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Session
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpen}
        >
         Add New Session
        </Button>
        { }
      </Box>
      <br/>
      
      {/* User Form Modal */}
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>

          <TextField label="Title" fullWidth margin="dense" {...register("title")} error={!!errors.title} helperText={errors.title?.message} />
          <TextField label="Subtitle" fullWidth margin="dense" {...register("subTitle")} error={!!errors.subTitle} helperText={errors.subTitle?.message} />
          <TextField label="Description" fullWidth margin="dense" {...register("description")} error={!!errors.description} helperText={errors.description?.message} />
          <TextField label="Image URL" fullWidth margin="dense" {...register("image")} error={!!errors.image} helperText={errors.image?.message} />
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
        <SessionTableToolbar
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
              <SessionTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_sessions.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _sessions?.map((user) => user.id.toString())
                  )
                }
                headLabel={[
                  { id: 'image', label: 'Image', width: '20%' },

                  { id: 'status', label: 'Status', width: '10%' },
                  { id: 'price', label: 'Price', width: '10%' },
                  { id: 'description', label: 'description', width: '60%' },



                ]}
              />
              <TableBody>
                {dataFiltered?.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <SessionTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                      onSelectRow={() => table.onSelectRow(row.id.toString())}
                      updateData={updateData}
                      onDeleteSuccess={loadData}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _sessions.length)}
                />

                {notFoundTrigger && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_sessions.length}
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

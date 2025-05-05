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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { GymFacilitiesTableRow } from '../gym-facilities-table-row';
import { GymFacilitiesTableHead } from '../gym-facilities-table-head';
import { TableEmptyRows } from '../gym-facilities-table-empty-rows';
import { GymFacilitiesTableToolbar } from '../gym-facilities-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { GymFacilitiesProps } from '../gym-facilities-table-row';

import {GymModel} from "../../../models/GymModel";
import {createGymFacility, getAllGymFacilities, updateGymFacility} from "../../services/GymService";

// ----------------------------------------------------------------------

export function GymFacilitiesView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [notFoundTrigger, setNotFoundTrigger] = useState(false);
  const [dataFiltered, setDataFiltered] = useState<GymFacilitiesProps[]>([]);
  const [modifiedId, setModifiedId] = useState<number>(-1);
  const [_facilities, setGymFacilities] = useState<GymModel[]>([]);

  // Snackbar state for errors
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const schema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const updateData = async (id: string) => {
    const userToEdit = _facilities.find(u => u.id.toString() === id);
    setModifiedId(Number(id));
    if (userToEdit) {
      reset(userToEdit);
      handleOpen();
    }
  };

  const onSubmit = async (data: any) => {
    console.log("Form submitted: ", data);

    if (modifiedId === -1) {
      const result = await createGymFacility(GymModel.fromJson(data));
      if (result.status) {
        handleClose();
        await loadData();
      } else {
        console.error(result);
        setSnackbarMessage(JSON.stringify(result.errorMsg, null, 2));
        setSnackbarOpen(true);
      }
    } else {
      const m = new GymModel({ id: modifiedId, name: data.name });
      const result = await updateGymFacility(m);
      if (result.status) {
        handleClose();
        await loadData();
      } else {
        console.error(result);
        setSnackbarMessage(JSON.stringify(result, null, 2));
        setSnackbarOpen(true);
      }
    }
  };

  // Fetch raw data only
  const loadData = useCallback(async () => {
    const models = await getAllGymFacilities();
    if (models.status) {
      setGymFacilities(models.data!);
      setNotFoundTrigger(false);
    } else {
      setNotFoundTrigger(true);
      setGymFacilities([]);
    }
  }, []);

  // Recompute filtered & sorted data whenever dependencies change
  useEffect(() => {
    setDataFiltered(
      applyFilter({
        inputData: _facilities.map(m => m.toGymModelProps()),
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      })
    );
  }, [ _facilities, filterName, table.order, table.orderBy ]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Gym Facilities
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => { reset(); setModifiedId(-1); handleOpen(); }}
        >
          Add New Gym Facility
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modifiedId === -1 ? 'Add New Item' : 'Edit Item'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              fullWidth
              margin="dense"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Snackbar for error notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Card>
        <GymFacilitiesTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(e) => { setFilterName(e.target.value); table.onResetPage(); }}
        />

        <Scrollbar>
          <TableContainer>
            <Table>
              <GymFacilitiesTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_facilities.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _facilities.map(u => u.id.toString())
                  )
                }
                headLabel={[{ id: 'name', label: 'Name', width: '100%' }]}
              />

              <TableBody>
                {dataFiltered.slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                ).map(row => (
                  <GymFacilitiesTableRow
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
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _facilities.length)}
                />

                {notFoundTrigger && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_facilities.length}
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

  const onSelectRow = useCallback((value: string) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  }, []);

  const onResetPage = useCallback(() => setPage(0), []);
  const onChangePage = useCallback((_: unknown, newPage: number) => setPage(newPage), []);
  const onChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    onResetPage();
  }, [onResetPage]);

  return { page, order, onSort, orderBy, selected, rowsPerPage, onSelectRow, onResetPage, onChangePage, onSelectAllRows, onChangeRowsPerPage };
}
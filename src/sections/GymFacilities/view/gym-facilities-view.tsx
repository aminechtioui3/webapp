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
  const [dataFiltered, setDataFiltered] = useState<GymFacilitiesProps[]>();
  const [modifiedId, setModifiedId] = useState<number>(-1);
  const [_facilities, setGymFacilities] = useState<GymModel[]>([]);
  const handleOpen = async () => {setOpen(true)};
  const handleClose = () =>(setOpen(false));




const schema = z.object({

  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
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
    const userToEdit = _facilities.find(user => user.id.toString() === id.toString()); // Find user by ID

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
      const result = await createGymFacility(GymModel.fromJson(data));
      console.log(result);

      if (result.status) {
        handleClose();
        await loadData(); // ✅ Reload data after successful creation
      } else {
        console.log(result);
      }
    } else {
      // Update existing membership
      const m = new GymModel({
       id: modifiedId,
       name: data.name,
      });

      const result = await updateGymFacility(m);
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
    const models = await getAllGymFacilities();
    console.log(models);

    if (models.status) {
      setGymFacilities(models.data!);
      setDataFiltered(applyFilter({
        inputData: models.data!.map(m => m.toGymModelProps()),
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      }));
    } else {
      setNotFoundTrigger(true)
      setGymFacilities([]);
    }
  }, [filterName, table.order, table.orderBy]); // ✅ Dependencies are properly managed

  useEffect(() => {
    loadData();
  }, [filterName, loadData, table.order, table.orderBy]); // ✅ No more infinite re-renders

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
          onClick={handleOpen}
        >
         Add New Gym Facility
        </Button>
        { }
      </Box>
      <br/>
      
      {/* User Form Modal */}
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>

          <TextField label="Name" fullWidth margin="dense" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>

      <Card>
        <GymFacilitiesTableToolbar
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
              <GymFacilitiesTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_facilities.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _facilities?.map((user) => user.id.toString())
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name', width: '100%' },





                ]}
              />
              <TableBody>
                {dataFiltered?.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
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

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
import { HistoryTableRow } from '../history-table-row';
import { HistoryTableHead } from '../history-table-head';
import { TableEmptyRows } from '../history-table-empty-rows';
import { HistoryTableToolbar } from '../history-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { HistoryProps } from '../history-table-row';


import {HistoryModel} from "../../../models/HistoryModel";
import {getExercise} from "../../services/ExerciseService";
import {getHistory} from "../../services/HistoryService";


// ----------------------------------------------------------------------

export function HistoryView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [notFoundTrigger, setNotFoundTrigger] = useState(false);
  const [dataFiltered, setDataFiltered] = useState<HistoryProps[]>();
  const [_history, setHistory] = useState<HistoryModel[]>([]);
  const handleOpen = async () => {setOpen(true)};
  const handleClose = () =>(setOpen(false));
  const PriceSelectionTable=()=>{
    const prices = [10, 20, 30, 50, 75, 100, 150, 200]; // Pricing options
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [customField, setCustomField] = useState("default");
    
  }



const schema = z.object({

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
    const userToEdit = _history.find(user => user.id.toString() === id.toString()); // Find user by ID

  };



  const loadData = useCallback(async () => {
    const res = await getHistory();
    if (res.status) {
      setNotFoundTrigger(false)
      setHistory(res.data);
      setDataFiltered(
          applyFilter({
            inputData: res.data.map((m) => m.toHistoryProps()),
            comparator: getComparator(table.order, table.orderBy),
            filterName,
          })
      );
    }else{
      setHistory([]);
      setNotFoundTrigger(true)
    }
  }, [filterName, table.order, table.orderBy]);

  useEffect(() => {
    loadData();
  }, [loadData]);





  useEffect(() => {
    loadData();
  }, [filterName, table.order, table.orderBy]); // ✅ No more infinite re-renders
  const notFound = dataFiltered && dataFiltered!.length && !!filterName;
  
  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          History
        </Typography>


        { }
      </Box>

      <br/>


      <Card>
        <HistoryTableToolbar
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
              <HistoryTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_history.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _history?.map((user) => user.id.toString())
                  )
                }
                headLabel={[

                  { id: 'image', label: 'Image', width: '30%' },

                  { id: 'date', label: 'Date', width: '20%' },
                  { id: 'content', label: 'Content', width: '50%' },




                ]}
              />
              <TableBody>
                {dataFiltered?.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <HistoryTableRow
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
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _history.length)}
                />

                {notFoundTrigger && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_history.length}
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

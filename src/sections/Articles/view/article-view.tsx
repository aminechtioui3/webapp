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
import { ArticleTableRow } from '../article-table-row';
import { ArticleTableHead } from '../article-table-head';
import { TableEmptyRows } from '../article-table-empty-rows';
import { ArticleTableToolbar } from '../article-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { ArticleProps } from '../article-table-row';
import {getArticles, createArticle, updateArticle} from "../../services/ArticleService";
import {ArticleModel} from "../../../models/Article";



// ----------------------------------------------------------------------

export function ArticleView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [notFoundTrigger, setNotFoundTrigger] = useState(false);
  const [dataFiltered, setDataFiltered] = useState<ArticleProps[]>();
  const [modifiedId, setModifiedId] = useState<number>(-1);
  const [_users, setUsers] = useState<ArticleModel[]>([]);
  const handleOpen = async () => {setOpen(true)};
  const handleClose = () =>(setOpen(false));
  const PriceSelectionTable=()=>{
    const prices = [10, 20, 30, 50, 75, 100, 150, 200]; // Pricing options
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [customField, setCustomField] = useState("default");
    
  }



const schema = z.object({

  title: z.string().min(1, "Title is required"),
  header: z.string().min(1, "Header is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  video: z.string().optional(),
  date: z.union([z.string(), z.date()]),
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
    const userToEdit = _users.find(user => user.id.toString() === id.toString()); // Find user by ID

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
      const result = await createArticle(ArticleModel.fromJson(data));
      console.log(result);

      if (result.status) {
        handleClose();
        await loadData(); // ✅ Reload data after successful creation
      } else {
        console.log(result);
      }
    } else {
      // Update existing membership
      const m = new ArticleModel(
          modifiedId,  // ID stays the same
          data.title,  // Populate fields from form
          data.description,
          data.header,
          data.image,
          data.video,
          data.date,
          data.available,
          new Date(),
          new Date(),
      );

      const result = await updateArticle(m);
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
    const memberships = await getArticles();
    console.log(memberships);

    if (memberships.status) {
      setUsers(memberships.data!);
      setDataFiltered(applyFilter({
        inputData: memberships.data!.map(m => m.toArticleProps()),
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      }));
    } else {
      setNotFoundTrigger(true)
      setUsers([]);
    }
  }, [filterName, table.order, table.orderBy]); // ✅ Dependencies are properly managed

  useEffect(() => {
    loadData();
  }, [filterName, table.order, table.orderBy]); // ✅ No more infinite re-renders
  const notFound = dataFiltered && dataFiltered!.length && !!filterName;
  
  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Membership
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpen}
        >
         Add New Membership
        </Button>
        { }
      </Box>

      <p>
        In this page you will find all the memberships you have in your gym
      </p>
      <br/>
      
      {/* User Form Modal */}
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>

          <TextField label="Title" fullWidth margin="dense" {...register("title")} error={!!errors.title} helperText={errors.title?.message} />
          <TextField label="Header" fullWidth margin="dense" {...register("header")} error={!!errors.header} helperText={errors.header?.message} />
          <TextField label="Description" fullWidth margin="dense" {...register("description")} error={!!errors.description} helperText={errors.description?.message} />
          <TextField label="Image URL" fullWidth margin="dense" {...register("image")} error={!!errors.image} helperText={errors.image?.message} />
          <TextField label="Video URL" fullWidth margin="dense" {...register("video")} error={!!errors.video} helperText={errors.video?.message} />
          <TextField label="Date" type="date" fullWidth margin="dense" {...register("date")} error={!!errors.date} helperText={errors.date?.message} />
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
        <ArticleTableToolbar
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
              <ArticleTableHead
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
                  { id: 'image', label: 'Image', width: '30%' },
                  { id: 'name', label: 'Name', width: '20%' },
                  { id: 'header', label: 'Header', width: '20%' },
                  { id: 'status', label: 'Status', width: '10%' },
                  { id: 'date', label: 'Date', width: '10%' },




                ]}
              />
              <TableBody>
                {dataFiltered?.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ArticleTableRow
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

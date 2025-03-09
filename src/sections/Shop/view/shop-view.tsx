import { UserAccount } from 'src/models/UserAccount';
import Select from 'react-select';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';

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
import { ShopProps, ShopTableRow } from '../shop-table-row';
import { ShopTableHead } from '../shop-table-head';
import { ShopTableToolbar } from '../shop-table-toolbar';
import { applyFilter, emptyRows, getComparator } from '../utils';

import { ActiveMembership } from '../../../models/ActiveMembership';
import { ActiveMembershipCreationDTO } from '../../../models/ActivateMembershipCreationDTO';
import { createActiveMembership, getMembers, updateActiveMembership } from '../../services/UserService';

import { TableEmptyRows } from '../shop-table-empty-rows';
import {ProductCategory} from "../../../models/ProductCategoryModel";
import {
  createShopProduct,
  getAllProductCategories,
  getAllShopProducts,
  updateProduct
} from "../../services/shopService";
import {ProductModel} from "../../../models/ProductModel";

// ----------------------------------------------------------------------

export function ShopView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [notFoundTrigger, setNotFoundTrigger] = useState(false);
  const [modifiedId, setModifiedId] = useState<number | null>(null);
  const [dataFiltered, setDataFiltered] = useState<ShopProps[]>();
  const [_users, setUsers] = useState<ProductModel[]>([]);
  const [productCategory, setProductCategory] = useState<ProductCategory[]>([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState<ProductCategory | null>(null);

  const schema = z.object({
    id: z.number().optional(),
    title: z.string(),
    brand: z.string(),
    model: z.string(),
    description: z.string(),
    image: z.string().optional(),
    categoryId: z.number(),
    price: z.number(),
    salePercent: z.number(),
    availableNumber: z.number(),
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
      availableNumber: 0,
      salePercent:0
    }
  });

  // Sync selected membership with form state
  useEffect(() => {
    if (selectedProductCategory) {
      setValue('categoryId', selectedProductCategory.id);
    }
  }, [selectedProductCategory, setValue]);

  const handleClose = () => {
    setOpen(false);
    setModifiedId(null);
    setSelectedProductCategory(null);
    reset();
  };

  // Add New Member handler
  const handleOpenAdd = async () => {
    setModifiedId(-1);
    reset();

    try {
      const response = await getAllProductCategories();
      if (response.status) {
        setProductCategory(response.data);
        setSelectedProductCategory(null);
      } else {
        handleClose();
        alert(response.displayMsg);
      }
    } catch (error) {
      console.error('Error fetching productCategory:', error);
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



            brand: userToEdit.brand,
            model: userToEdit.model,
            description: userToEdit.description,
            image: userToEdit.image,
            categoryId: userToEdit.category.id,
            price: userToEdit.price,
            salePercent: userToEdit.salePercent,
            availableNumber: userToEdit.availableNumber,
            available: userToEdit.available,
          };

          reset(formattedUser);

          try {
            const response = await getAllProductCategories();
            if (response.status) {
              setProductCategory(response.data);
              const userMembership = response.data.find((m) => m.id === userToEdit.category.id);
              if (userMembership) {
                setSelectedProductCategory(userMembership);
                setValue('categoryId', userMembership.id);
              }
            }
          } catch (error) {
            console.error('Error fetching productCategory:', error);
          }

          setOpen(true);
        }
      }
    };

    loadUserDataAndOpenDialog();
  }, [modifiedId, _users, reset, setValue]);

  const handleSubmitForm = async (data: any) => {
    try {
      if (!selectedProductCategory) {
        alert('Please select a valid membership');
        return;
      }

      if (!selectedProductCategory) {
        alert('Please select a valid membership');
        return;
      }

      if (modifiedId === -1) {
        // Create new membership
        const productModel = new ProductModel(
            data.title,
            data.brand,
            data.model,
            data.description,
            data.image,
            selectedProductCategory,
            data.price,
            data.salePercent,
            data.availableNumber,
            data.available,
        );



        console.log(productModel);

        const result = await createShopProduct(productModel);
        console.log(result);
        if (result.status) {
          console.log(result.status);
          handleClose();
          await loadData();
        }
      } else {
        // Update existing membership

        console.log("selected Product Category");
        console.log(selectedProductCategory);
        console.log("selected ProductCategory Id");
        console.log(data.membershipId);
        const newMembership = productCategory.find((m) => m.id === selectedProductCategory.id);
        const updatedProductModel = new ProductModel(
            modifiedId??-1,
            data.title,
            data.brand,
            data.model,
            data.description,
            selectedProductCategory,
            data.image,
            data.price,
            data.salePercent,
            data.availableNumber,
            data.available,


        );
        console.log("update membership");
        console.log(updatedProductModel);

        const result = await updateProduct(updatedProductModel);
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
    const res = await getAllShopProducts();
    if (res.status) {
      setNotFoundTrigger(false)
      setUsers(res.data);
      setDataFiltered(
          applyFilter({
            inputData: res.data.map((m) => m.toShopProps()),
            comparator: getComparator(table.order, table.orderBy),
            filterName,
          })
      );
    }else{
      setUsers([]);
      setNotFoundTrigger(true)
    }
  }, [filterName, table.order, table.orderBy]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateData = (id: string) => {
    setModifiedId(Number(id));
    const selectedMem = _users.find((user) => user.id.toString() === id);
    if (selectedMem) {
      const account= _users.find((user) => user.id.toString() === id);
      console.log("the selected account is",account)

    }
  };


  return (
    <DashboardContent>

      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Shop
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpenAdd}
        >
          Add New Product
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
                options={productCategory}
                value={selectedProductCategory}
                onChange={setSelectedProductCategory}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option.id.toString()}
                placeholder="Select Membership..."
                isSearchable
              />
            </div>

            <input
              type="hidden"
              {...register('categoryId')}
              value={selectedProductCategory?.id || ''}
            />

            title: this.title,
            brand: this.brand,
            model: this.model,
            description: this.description,
            image: this.image,
            category: this.category.toJson(),
            price: this.price,
            salePercent: this.salePercent,
            availableNumber: this.availableNumber,
            available: this.available,


            <TextField label="Title" fullWidth margin="dense" {...register("title")} error={!!errors.title} helperText={errors.title?.message} />

            <TextField label="Brand" fullWidth margin="dense" {...register("brand")} error={!!errors.brand} helperText={errors.brand?.message} />

            <TextField label="Model" fullWidth margin="dense" {...register("model")} error={!!errors.model} helperText={errors.model?.message} />

            <TextField label="Description" fullWidth margin="dense" {...register("description")} error={!!errors.description} helperText={errors.description?.message} />

            <TextField label="image" fullWidth margin="dense" {...register("image")} error={!!errors.image} helperText={errors.image?.message} />

            <TextField label="image" fullWidth margin="dense" {...register("price")} error={!!errors.image} helperText={errors.image?.message} />

            <TextField
                {...register("price", { valueAsNumber: true })}
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
            />

            <TextField
                {...register("salePercent", { valueAsNumber: true })}
                margin="dense"
                label="Sale percent"
                type="number"
                fullWidth
                error={!!errors.salePercent}
                helperText={errors.salePercent?.message}
            />
            <TextField
                {...register("availableNumber", { valueAsNumber: true })}
                margin="dense"
                label="Available number"
                type="number"
                fullWidth
                error={!!errors.availableNumber}
                helperText={errors.availableNumber?.message}
            />

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
        <ShopTableToolbar
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
              <ShopTableHead
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

                  { id: 'name', label: 'Name', width: '20%' },
                  { id: 'membership', label: 'Membership', width: '20%' },
                  { id: 'startAt', label: 'Start at', width: '20%' },
                  { id: 'endAt', label: 'End at', width: '20%' },
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
                    <ShopTableRow
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
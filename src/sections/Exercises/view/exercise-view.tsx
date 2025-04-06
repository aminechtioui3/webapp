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
import { ExerciseProps, ExerciseTableRow } from '../exercise-table-row';
import { ExerciseTableHead } from '../exercise-table-head';
import { ExerciseTableToolbar } from '../exercise-table-toolbar';
import { applyFilter, emptyRows, getComparator } from '../utils';

import { TableEmptyRows } from '../exercise-table-empty-rows';
import {ExerciseModel} from "../../../models/ExerciseModel";
import {SessionModel} from "../../../models/SessionModel";
import {createExercise, getExercise, updateExercise} from "../../services/ExerciseService";
import {getAllSessions} from "../../services/SessionService";

// ----------------------------------------------------------------------

export function ExerciseView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [notFoundTrigger, setNotFoundTrigger] = useState(false);
  const [modifiedId, setModifiedId] = useState<number | null>(null);
  const [dataFiltered, setDataFiltered] = useState<ExerciseProps[]>();
  const [_exercises, setExercises] = useState<ExerciseModel[]>([]);
  const [sessions, setSessions] = useState<SessionModel[]>([]);
  const [selectedSession, setSelectedSession] = useState<SessionModel | null>(null);

  const schema = z.object({


    id: z.number().optional(),
    sessionId: z.number(),
    name: z.string(),
    description: z.string(),
    image: z.string().optional(),
    video: z.string().optional(),
    durationInMinutes: z.number(),
    calorie: z.number(),
    level: z.string(),
    muscles: z.string(),
    tags: z.string(),
    repeatNumber: z.string().optional(),
    available: z.boolean().default(true),
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
      repeatNumber: "0",
      calorie:0,
      durationInMinutes:0,
    }
  });

  // Sync selected session with form state
  useEffect(() => {
    if (selectedSession) {
      setValue('sessionId', selectedSession.id);
    }
  }, [selectedSession, setValue]);

  const handleClose = () => {
    setOpen(false);
    setModifiedId(null);
    setSelectedSession(null);
    reset();
  };

  // Add New  handler
  const handleOpenAdd = async () => {
    setModifiedId(-1);
    reset();

    try {
      const response = await getAllSessions();
      if (response.status) {
        setSessions(response.data);
        setSelectedSession(null);
      } else {
        handleClose();
        alert(response.displayMsg);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }

    setOpen(true);
  };

  // Edit Member handler
  useEffect(() => {
    const loadUserDataAndOpenDialog = async () => {
      if (modifiedId && modifiedId !== -1) {
        const userToEdit = _exercises.find((user) => user.id === modifiedId);
        if (userToEdit) {
          const formattedUser = {
            ...userToEdit,

            sessionId: userToEdit.session.id,

          };

          reset(formattedUser);

          try {
            const response = await getAllSessions();
            if (response.status) {
              setSessions(response.data);
              const userSessions = response.data.find((m) => m.id === userToEdit.session.id);
              if (userSessions) {
                setSelectedSession(userSessions);
                setValue('sessionId', userSessions.id);
              }
            }
          } catch (error) {
            console.error('Error fetching sessions:', error);
          }

          setOpen(true);
        }
      }
    };

    loadUserDataAndOpenDialog();
  }, [modifiedId, _exercises, reset, setValue]);

  const handleSubmitForm = async (data: any) => {
    try {
      if (!selectedSession) {
        alert('Please select a valid sessions');
        return;
      }

      if (!selectedSession) {
        alert('Please select a valid session');
        return;
      }

      if (modifiedId === -1) {
        // Create new exercise
        const exerciseModel = new ExerciseModel({
            id:- 1,
            name:data.name,
            description:data.description,
            durationInMinutes:data.durationInMinutes,
            calorie:data.calorie,
            session:selectedSession,
            available:data.available,
            image:data.image,
            video:data.video,
            level:data.level,
            muscles:data.muscles,
            tags:data.tags,
            repeatNumber:data.repeatNumber,
            createdAt:new Date(),
            updatedAt:new Date(),

      });



        console.log(exerciseModel);

        const result = await createExercise(exerciseModel);
        console.log(result);
        if (result.status) {
          console.log(result.status);
          handleClose();
          await loadData();
        }
      } else {
        // Update existing exercise

        console.log("selected Session");
        console.log(selectedSession);
        console.log("selected session id");
        console.log(data.sessionId);
       const updatedExercise = new ExerciseModel({
          id: modifiedId??-1,
          name:data.name,
          description:data.description,
          durationInMinutes:data.durationInMinutes,
          calorie:data.calorie,
          session:selectedSession,
          available:data.available,
          image:data.image,
          video:data.video,
          level:data.level,
          muscles:data.muscles,
          tags:data.tags,
          repeatNumber:data.repeatNumber,
          createdAt:new Date(),
          updatedAt:new Date(),
        }



        );
        console.log("update exercise", updatedExercise);


        const result = await updateExercise(updatedExercise);
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
    const res = await getExercise();
    if (res.status) {
      setNotFoundTrigger(false)
      setExercises(res.data);
      setDataFiltered(
          applyFilter({
            inputData: res.data.map((m) => m.toExerciseProps()),
            comparator: getComparator(table.order, table.orderBy),
            filterName,
          })
      );
    }else{
      setExercises([]);
      setNotFoundTrigger(true)
    }
  }, [filterName, table.order, table.orderBy]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateData = (id: string) => {
    setModifiedId(Number(id));
    const selectedMem = _exercises.find((user) => user.id.toString() === id);
    if (selectedMem) { /* empty */ }
  };


  return (
    <DashboardContent>

      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Exercise
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpenAdd}
        >
          Add New Exercise
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {modifiedId && modifiedId !== -1 ? 'Update exercise' : 'Add New Exercise'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div style={{ marginBottom: '10px' }}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Session</label>
              <Select
                options={sessions}
                value={selectedSession}
                onChange={setSelectedSession}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option.id.toString()}
                placeholder="Select Session..."
                isSearchable
              />
            </div>

            <input
              type="hidden"
              {...register('sessionId')}
              value={selectedSession?.id || ''}
            />


              <>

                id: number,
                name: string,
                description: string,
                durationInMinutes: number,
                calorie: number,
                session: SessionModel,
                available: boolean,
                image?: string,
                video?: string,
                level?: string,
                muscles?: string,
                tags?: string,
                repeatNumber?: string,
                createdAt: Date = new Date(),
                updatedAt: Date = new Date()

                <TextField label="Name" fullWidth margin="dense" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
                <TextField label="Description" fullWidth margin="dense" {...register("description")} error={!!errors.description} helperText={errors.description?.message} />
                <TextField label="Image URL" fullWidth margin="dense" {...register("image")} error={!!errors.image} helperText={errors.image?.message} />
                <TextField label="Video URL" fullWidth margin="dense" {...register("video")} error={!!errors.video} helperText={errors.video?.message} />
                <TextField label="Level" fullWidth margin="dense" {...register("level")} error={!!errors.level} helperText={errors.level?.message} />
                <TextField label="Muscles" fullWidth margin="dense" {...register("muscles")} error={!!errors.muscles} helperText={errors.muscles?.message} />
                <TextField label="Tags" fullWidth margin="dense" {...register("tags")} error={!!errors.tags} helperText={errors.tags?.message} />
                <TextField label="Repeat" fullWidth margin="dense" {...register("repeatNumber")} error={!!errors.repeatNumber} helperText={errors.repeatNumber?.message} />

                <TextField
                    {...register("durationInMinutes", { valueAsNumber: true })}
                    margin="dense"
                    label="Duration (minutes)"
                    type="number"
                    fullWidth
                    error={!!errors.durationInMinutes}
                    helperText={errors.durationInMinutes?.message}
                />
                <TextField
                    {...register("calorie", { valueAsNumber: true })}
                    margin="dense"
                    label="Calories"
                    type="number"
                    fullWidth
                    error={!!errors.durationInMinutes}
                    helperText={errors.durationInMinutes?.message}
                />

              </>



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
        <ExerciseTableToolbar
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
              <ExerciseTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_exercises.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _exercises?.map((user) => user.id.toString())
                  )
                }
                headLabel={[

                  { id: 'name', label: 'Name', width: '20%' },
                  { id: 'session.title', label: 'Session', width: '20%' },
                  { id: 'calorie', label: 'calories', width: '20%' },
                  { id: 'level', label: 'Level', width: '20%' },
                  { id: 'durationInMinutes', label: 'Duration', width: '20%' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  ?.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ExerciseTableRow
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
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _exercises.length)}
                />

                {notFoundTrigger && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_exercises.length}
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
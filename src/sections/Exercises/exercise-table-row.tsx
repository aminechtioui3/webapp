import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { timeStamp } from 'console';

import {applyFilter, getComparator} from "./utils";
import {MembershipModel} from "../../models/MembershipModel";
import {deleteActiveMembership} from "../services/UserService";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {DialogContentText} from "@mui/material";
import {UserAccount} from "../../models/UserAccount";

// ----------------------------------------------------------------------

export type ActiveMembershipProps = {
  id: number;
  user: UserAccount;
  membership: MembershipModel;
  endDate: Date;
  startDate: Date;
  note?: string;
  status?: string;
};

type UserTableRowProps = {
  row: ActiveMembershipProps;
  selected: boolean;
  onSelectRow: () => void;
  updateData: void;
  onDeleteSuccess: () => void;
};


export function ExerciseTableRow({ row, selected, onSelectRow, updateData, onDeleteSuccess  }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);


  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Add this state






  const handleClosePopover = useCallback( () => {

      setOpenPopover(null);

  }, []);


  const updateActiveMem = useCallback(async () => {
    updateData(row.id.toString()); // Convert row.id to string
  }, [updateData, row.id]);


  const handleOpenDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(true);
    setOpenPopover(null);

    onDeleteSuccess();
    handleClosePopover(); // Close the popover when opening dialog
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(false);
  }, []);

  const deleteActiveMem = useCallback(async () => {
    const result = await deleteActiveMembership(row.id.toString());
    if (result.status) {
      onDeleteSuccess();
      handleCloseDeleteDialog();
    }
  }, [row.id, onDeleteSuccess, handleCloseDeleteDialog]);






  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.user.firstName} src={row.user.image} />
            {row.user.firstName}  {row.user.lastName}
            {"\n"}
                {row.user.phone}
          </Box>
        </TableCell>

        <TableCell>{row.membership.title}</TableCell>



        <TableCell>{row.startDate.toISOString()}</TableCell>
        <TableCell>{row.endDate.toISOString()}</TableCell>
        <TableCell >
          {row.status ? (
              <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
              '-'
          )}
        </TableCell>




        <TableCell>
          {/* <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label> */}
          
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={updateActiveMem}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>


          <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
      <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Membership
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this membership for {row.user.firstName} {row.user.lastName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
              onClick={deleteActiveMem}
              color="error"
              autoFocus
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

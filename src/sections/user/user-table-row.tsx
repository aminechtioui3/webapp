import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import {DialogContentText} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';

// eslint-disable-next-line import/no-cycle
import Tooltip from "@mui/material/Tooltip";
import {deleteActiveMembership} from "../services/UserService";

import type {UserAccount} from "../../models/UserAccount";
// eslint-disable-next-line import/no-cycle
import type {MembershipModel} from "../../models/MembershipModel";

// ----------------------------------------------------------------------

export type ActiveMembershipProps = {
  id: number;
  user: UserAccount;
  membership: MembershipModel;
  endDate: Date;
  startDate: Date;
  price: number;
  paymentPercent: number;
  note?: string;
  status?: string;
};

type UserTableRowProps = {
  row: ActiveMembershipProps;
  selected: boolean;
  onSelectRow: () => void;
  updateData: (id: string) => void ;
  onDeleteSuccess: () => void;
};


export function UserTableRow({ row, selected, onSelectRow, updateData, onDeleteSuccess  }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);


  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Add this state



  const getStatusDetails = (startDate: Date, endDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffStart = Math.floor((today.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const diffEnd = Math.floor((end.getTime() - today.getTime()) / (1000 * 3600 * 24));

    if (today < start) {
      return {
        color: 'grey',
        tooltip: `Not Active Yet - Starts in ${  Math.ceil((start.getTime() - today.getTime()) / (1000 * 3600 * 24))  } days`
      };
    }
    if (diffStart <= 5) {
      return {
        color: 'blue',
        tooltip: `New - ${5 - diffStart} days since activation`
      };
    }
    if (today > end) {
      return { color: 'red', tooltip: 'Expired' };
    }
    if (diffEnd <= 7) {
      return {
        color: 'orange',
        tooltip: `End Soon - ${diffEnd} days remaining`
      };
    }
    return {
      color: 'green',
      tooltip: `Active - ${diffEnd} days remaining`
    };
  };

  const statusDetails = getStatusDetails(row.startDate, row.endDate);
  const NEW_THRESHOLD_PERCENT = 7; // 7% of total duration
  const END_SOON_THRESHOLD_PERCENT = 85; // 85% of total duration

  const calculateRowStatus = (start: Date, end: Date) => {
    const today = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const elapsedDays = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const elapsedPercentage = totalDays > 0 ? (elapsedDays / totalDays) * 100 : 0;

    let status = 'Active';
    let color = 'green';
    let tooltip = '';

    if (today < startDate) {
      status = 'Not Active Yet';
      color = 'grey';
      const daysLeft = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      tooltip = `Starts in ${daysLeft} days`;
    } else if (today > endDate) {
      status = 'Expired';
      color = 'red';
      const daysExpired = Math.ceil((today.getTime() - endDate.getTime()) / (1000 * 3600 * 24));
      tooltip = `Expired ${daysExpired} days ago`;
    } else if (elapsedPercentage <= NEW_THRESHOLD_PERCENT) {
      status = 'New';
      color = 'blue';
      tooltip = `New (${elapsedPercentage.toFixed(1)}% of duration)`;
    } else if (elapsedPercentage >= END_SOON_THRESHOLD_PERCENT) {
      status = 'End Soon';
      color = 'orange';
      tooltip = `Ending soon (${elapsedPercentage.toFixed(1)}% of duration)`;
    } else {
      const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      tooltip = `Active - ${daysLeft} days remaining (${elapsedPercentage.toFixed(1)}% elapsed)`;
    }

    return { status, color, tooltip };
  };

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
  }, [handleClosePopover, onDeleteSuccess]);

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



        <TableCell>{row.startDate.toLocaleDateString()}</TableCell>
        <TableCell>{row.endDate.toLocaleDateString()}</TableCell>

        <TableCell>
          <Tooltip title={calculateRowStatus(row.startDate, row.endDate).tooltip}>
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: calculateRowStatus(row.startDate, row.endDate).color,
              margin: '0 auto',
              cursor: 'help'
            }} />
          </Tooltip>
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

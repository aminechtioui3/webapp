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

import { Iconify } from 'src/components/iconify';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
// eslint-disable-next-line import/no-cycle
import {deleteArticle} from "../services/ArticleService";


// ----------------------------------------------------------------------

export type ArticleProps = {

  id?: number;
  title: string;
  header: string;
  date: Date;
  status: boolean;
  image: string;
  description: string;
};

type MembershipTableRowProps = {
  row: ArticleProps;
  selected: boolean;
  onSelectRow: () => void;
  updateData: any;
  onDeleteSuccess: () => void;
};


export function ArticleTableRow({ row, selected, onSelectRow, updateData, onDeleteSuccess  }: MembershipTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);


  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Add this state






  const handleClosePopover = useCallback( () => {

      setOpenPopover(null);

  }, []);


  const updateActiveMembership = useCallback(async () => {
    updateData(row.id); // ✅ Now calling the function properly
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

  const deleteM = useCallback(async () => {
    const result = await deleteArticle(row.id!==undefined?row.id.toString():"undefined");
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
            <Avatar alt={row.title} src={row.image} />

            <Box display="flex" flexDirection="column">
              <span>{row.title}</span>
              <span style={{ color: 'gray', fontSize: '0.9rem' }}>{row.header}</span>

            </Box>

          </Box>
        </TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{row.date.toLocaleDateString()}</TableCell>




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
          <MenuItem onClick={updateActiveMembership}>
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
            Are you sure you want to delete the {row.title} membership!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
              onClick={deleteM}
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

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
import {deleteMembership} from "../services/MembershipService";
import {applyFilter, getComparator} from "./utils";

// ----------------------------------------------------------------------

export type MembershipProps = {
  id: number;
  name: string;
  price: number;
  status: boolean;
  image: string;
  description: string;
};

type UserTableRowProps = {
  row: MembershipProps;
  selected: boolean;
  onSelectRow: () => void;
  updateData: any;
};


export function MembershipTableRow({ row, selected, onSelectRow, updateData  }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);





  const handleClosePopover = useCallback( () => {

      setOpenPopover(null);

  }, []);


  const updateActiveMembership = useCallback(async () => {
    updateData(row.id); // ✅ Now calling the function properly
  }, [updateData, row.id]);

  const deleteActiveMembership = useCallback( async () => {

    const result = await deleteMembership(row.id.toString());
    console.log(result);
    if (result.status) {
      setOpenPopover(null);
    } else {
      console.log(result.status);
    }

  }, []);




  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.image} />
            {row.name}
          </Box>
        </TableCell>

        <TableCell >
          {row.status ? (
              <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
              '-'
          )}
        </TableCell>

        <TableCell>{row.price}</TableCell>
        <TableCell>{row.description}</TableCell>



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
          <MenuItem onClick={updateActiveMembership}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={deleteActiveMembership} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}

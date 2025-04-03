import { useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { GymModel } from 'src/models/GymModel';
import type { SxProps, Theme } from '@mui/material/styles';

// Function to get gyms from cookies
function getGymModelsFromCookies(): GymModel[] {
    const gymModelsJson = Cookies.get('gymFacilities');

    if (gymModelsJson) {
        const gymModelsArray = JSON.parse(gymModelsJson).map((gym: any) => GymModel.fromJson(gym));

        if (gymModelsArray.length === 0) {
            return [new GymModel({ id: -1, name: "Select a gym" })];
        }

        return gymModelsArray;
    }

    return [new GymModel({ id: -1, name: "Select a gym" })];
}

// Function to get selected gym from cookies
function getSelectedGymFromCookies(): GymModel {
    const selectedGymJson = Cookies.get('selectedGym');
    if (selectedGymJson) {
        return GymModel.fromJson(JSON.parse(selectedGymJson));
    }

    return new GymModel({ id: -1, name: "Select a gym" });
}

export type WorkspacesPopoverProps = {
    data?: GymModel[];
    sx?: SxProps<Theme>; // Add this line
};

export function WorkspacesPopover({ data = [], sx, ...other }: WorkspacesPopoverProps) {

    const gymModels = getGymModelsFromCookies();

    const [workspace, setWorkspace] = useState<GymModel>(getSelectedGymFromCookies());
    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

    useEffect(() => {
        // Ensure the selected gym is saved in cookies when component loads
        Cookies.set("selectedGym", JSON.stringify(workspace), { expires: 7, secure: true });
    }, [workspace]);

    const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    const handleChangeWorkspace = useCallback(
        (newValue: GymModel) => {
            let updatedGyms = [...gymModels];

            // If selecting a real gym, remove "Select a gym" from the list
            if (workspace.id === -1 && newValue.id !== -1) {
                updatedGyms = updatedGyms.filter((gym) => gym.id !== -1);
            }

            setWorkspace(newValue);
            Cookies.set("selectedGym", JSON.stringify(newValue), { expires: 7, secure: true });

            handleClosePopover();

            // 🔄 Refresh the page after gym selection
            setTimeout(() => {
                window.location.reload();
            }, 100);
        },
        [gymModels, workspace, handleClosePopover]
    );


    const renderLabel = (name: string) => <Label>{name}</Label>;

    return (
        <>
            <ButtonBase
                disableRipple
                onClick={handleOpenPopover}
                sx={{
                    pl: 2,
                    py: 3,
                    gap: 1.5,
                    pr: 1.5,
                    width: 1,
                    borderRadius: 1.5,
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    bgcolor: (theme) => theme.vars.palette.grey['500Channel'],
                }}
            >
                <Box flexGrow={1} display="flex" alignItems="center" sx={{ typography: 'body2' }}>

                    {renderLabel(workspace.name)}
                </Box>
                <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: 'text.disabled' }} />
            </ButtonBase>

            <Popover open={!!openPopover} anchorEl={openPopover} onClose={handleClosePopover}>
                <MenuList
                    disablePadding
                    sx={{
                        p: 0.5,
                        width: 260,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {gymModels.map((option) => (
                        <MenuItem
                            key={option.id}
                            selected={option.id === workspace.id}
                            onClick={() => handleChangeWorkspace(option)}
                        >
                            <Box component="span" sx={{ flexGrow: 1 }}>
                                {option.name}
                            </Box>
                        </MenuItem>
                    ))}
                </MenuList>
            </Popover>
        </>
    );
}

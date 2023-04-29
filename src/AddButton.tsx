import React from "react";
import {FileSystemEntryType} from "./FileSystem";
import {IconButton, Menu, MenuItem} from "@mui/material";
import {Add} from "@mui/icons-material";

export const AddButton: React.FC<{onClick: (type: FileSystemEntryType) => void}> = ({onClick}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const selectOption = (type: FileSystemEntryType) => {
        onClick(type);
        handleClose();
    }

    return (
        <div>
            <IconButton aria-label="add"
                        color="secondary"
                        size="small"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                <Add />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => selectOption('directory')}>
                    Directory
                </MenuItem>
                <MenuItem onClick={() => selectOption('file')}>
                    File
                </MenuItem>
            </Menu>
        </div>
    );
};
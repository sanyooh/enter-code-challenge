import React from "react";
import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import {Add, Delete, Description, Folder} from "@mui/icons-material";
import {FileSystemEntry, FileSystemEntryType} from "./FileSystem";

const DeleteButton: React.FC<{onClick: React.MouseEventHandler}> = ({onClick}) => {
    return (
        <IconButton aria-label="delete" color="secondary" size="small" onClick={onClick}>
            <Delete />
        </IconButton>
    );
};

const AddButton: React.FC<{onClick: (type: FileSystemEntryType) => void}> = ({onClick}) => {
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
                <MenuItem onClick={() => selectOption('directory')}>Directory</MenuItem>
                <MenuItem onClick={() => selectOption('file')}>File</MenuItem>
            </Menu>
        </div>
    );
};

interface FileEntryProps {
    entry: FileSystemEntry;
    onDelete: React.MouseEventHandler;
    onAdd?: (type: FileSystemEntryType) => void;
}

export const FileEntry: React.FC<FileEntryProps> = ({entry, onDelete, onAdd}) => (
    <Box
        display="flex"
        flexDirection="row"
        pr="30px"
        alignItems="center"
        gap="10px"
        minWidth="fit-content"
    >
        {entry.type === 'file' ? <Description color="primary" /> : <Folder color="primary" />}
        <Box>{entry.name}</Box>
        <DeleteButton onClick={onDelete} />
        {entry.type === 'directory' && onAdd ? <AddButton onClick={onAdd} /> : null}
    </Box>
);
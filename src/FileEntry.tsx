import React from "react";
import {Box, IconButton} from "@mui/material";
import {Delete, Description, Folder} from "@mui/icons-material";
import {FileSystemEntry, FileSystemEntryType} from "./FileSystem";
import {AddButton} from "./AddButton";

const DeleteButton: React.FC<{onClick: React.MouseEventHandler}> = ({onClick}) => {
    return (
        <IconButton
            aria-label="delete"
            color="secondary"
            size="small"
            onClick={onClick}
        >
            <Delete />
        </IconButton>
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
        {
            entry.type === 'file' ?
                <Description color="primary" /> :
                <Folder color="primary" />
        }
        <Box>
            {entry.name}
        </Box>
        <DeleteButton onClick={onDelete} />
        {
            entry.type === 'directory' && onAdd ?
                <AddButton onClick={onAdd} /> :
                null
        }
    </Box>
);
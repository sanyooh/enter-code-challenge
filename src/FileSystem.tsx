import React from "react";
import {Grid} from "@mui/material";
import {FileEntry} from "./FileEntry";
import {AddButton} from "./AddButton";


interface File {
    type: 'file';
    id: string;
    name: string;
}
interface Directory {
    type: 'directory';
    id: string;
    name: string;
    content?: (Directory | File)[];
}

export type FileSystemEntry = Directory | File;

export type FileSystemEntryType = FileSystemEntry['type'];

interface FileSystemProps {
    data: FileSystemEntry[];
    onDeleteEntry: (id: string) => void;
    onAddEntry: (type: FileSystemEntryType, parentEntryId?: string) => void;
}

export const FileSystem: React.FC<FileSystemProps> = ({ data, onDeleteEntry, onAddEntry }) => {
    const renderFileSystem = (entries: FileSystemEntry[]) => {
        return entries.map((entry, index) => {
            if (entry.type === 'directory') {
                return (
                    <Grid key={index} item>
                        <Grid container direction="row" alignItems="start" wrap="nowrap" width="100%">
                            <FileEntry
                                entry={entry}
                                onDelete={() => onDeleteEntry(entry.id)}
                                onAdd={(type) => onAddEntry(type, entry.id)}
                            />
                            {entry.content && (
                                <Grid item>
                                    <Grid
                                        container
                                        direction="column"
                                        spacing={2}
                                        alignItems="start"
                                    >
                                        {renderFileSystem(entry.content)}
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                );
            } else if (entry.type === 'file') {
                return (
                    <Grid key={index} item>
                        <Grid container direction="row" alignItems="start">
                            <Grid item>
                                <FileEntry entry={entry} onDelete={() => onDeleteEntry(entry.id)} />
                            </Grid>
                        </Grid>
                    </Grid>
                );
            }
            return null;
        });
    };

    return (
        <Grid container direction="column" spacing={2} overflow="auto">
            {renderFileSystem(data)}
            <Grid item>
                <AddButton onClick={(type: FileSystemEntryType) => onAddEntry(type)} />
            </Grid>
        </Grid>
    );
};
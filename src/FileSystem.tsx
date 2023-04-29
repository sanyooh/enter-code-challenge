import React from "react";
import {Grid} from "@mui/material";
import {FileEntry} from "./FileEntry";


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

interface FileSystemProps {
    data: FileSystemEntry[];
    onDeleteEntry: (id: string) => void;
}

export const FileSystem: React.FC<FileSystemProps> = ({ data, onDeleteEntry }) => {
    const renderFileSystem = (entries: FileSystemEntry[]) => {
        return entries.map((entry, index) => {
            if (entry.type === 'directory') {
                return (
                    <Grid key={index} item>
                        <Grid container direction="row" alignItems="start">
                            <FileEntry entry={entry} onDelete={() => onDeleteEntry(entry.id)} />
                            {entry.content && (
                                <Grid item>
                                    <Grid container direction="column" spacing={2} alignItems="start">{renderFileSystem(entry.content)}</Grid>
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
        <Grid container direction="column" spacing={2}>
            {renderFileSystem(data)}
        </Grid>
    );
};
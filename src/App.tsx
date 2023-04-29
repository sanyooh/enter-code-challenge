import React, {useState} from 'react';
import './App.css';
import {Box} from "@mui/material";
import {v4 as uuid} from 'uuid';
import {FileSystem, FileSystemEntry} from "./FileSystem";

const mockData: FileSystemEntry[] = [
    {
        type: 'directory',
        id: uuid(),
        name: 'level 1',
        content: [
            {
                type: 'directory',
                id: uuid(),
                name: 'level 2',
                content: [
                    {
                        type: 'directory',
                        id: uuid(),
                        name: 'level 3',
                    }
                ]
            },
            {
                type: 'file',
                id: uuid(),
                name: 'level 2',
            }
        ],
    },
    {
        type: 'directory',
        id: uuid(),
        name: 'level 1',
    },
    {
        type: 'file',
        id: uuid(),
        name: 'level 1',
    }
];

function App() {
    const [fileSystemData, setFileSystemData] = useState(mockData);
    const deleteEntry = (data: FileSystemEntry[], id: string) => {
        const deleteEntriesRecursively = (entries: FileSystemEntry[]): FileSystemEntry[] => {
            return entries.filter((entry) => {
                if (entry.id === id) {
                    return false;
                }
                if (entry.type === 'directory' && entry.content) {
                    entry.content = deleteEntriesRecursively(entry.content);
                }
                return true;
            });
        };

        setFileSystemData(deleteEntriesRecursively(data));
    }

    return (
        <Box p="20px">
            <>
                <h2>Enter Code Challenge - Finder</h2>
                <FileSystem data={fileSystemData} onDeleteEntry={(id) => deleteEntry(fileSystemData, id)} />
            </>
        </Box>
    );
}

export default App;

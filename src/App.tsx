import React from 'react';
import './App.css';
import {Box, Grid} from "@mui/material";

interface File {
    type: 'file';
    name: string;
}
interface Directory {
    type: 'directory';
    name: string;
    content?: (Directory | File)[];
}

type FileSystemEntry = Directory | File;

const mockData: FileSystemEntry[] = [
    {
        type: 'directory',
        name: 'level 1',
        content: [
            {
                type: 'directory',
                name: 'level 2',
                content: [
                    {
                        type: 'directory',
                        name: 'level 3',
                    }
                ]
            },
            {
                type: 'file',
                name: 'level 2',
            }
        ],
    },
    {
        type: 'directory',
        name: 'level 1',
    },
    {
        type: 'file',
        name: 'level 1',
    }
];

interface FileSystemProps {
    data: FileSystemEntry[];
}


const FileSystem: React.FC<FileSystemProps> = ({ data }) => {
    const renderFileSystem = (entries: FileSystemEntry[]) => {
        return entries.map((entry, index) => {
            if (entry.type === 'directory') {
                return (
                    <Grid key={index} item>
                        <Grid container direction="row" alignItems="start">
                            <Box pr="30px">
                                📁 {entry.name}
                            </Box>
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
                                <Box>
                                    📄 {entry.name}
                                </Box>
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

function App() {
  return (
    <Box p="20px">
        <>
            <h2>Enter Code Challenge - Finder</h2>
            <FileSystem data={mockData} />
        </>
    </Box>
  );
}

export default App;

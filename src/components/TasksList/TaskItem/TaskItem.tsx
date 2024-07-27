import { Box, Checkbox, IconButton, InputAdornment, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import { useTasksDispatch } from "../../../context/TasksContext";
import React, { useState } from "react";

interface TaskItemProps {
    name: string;
    type: 'plan' | 'done';
    id: string;
}

function TaskItem({ name, type, id }: TaskItemProps) {
    const [ isEditMode, setIsEditMode ] = useState(false);
    const [ newName, setNewName ] = useState(name);
    const tasksDispatch = useTasksDispatch();

    const isDone = type === 'done';
    let taskContent;

    const handleClickDelete = () => {
        tasksDispatch({
            type: 'deletedTask',
            id
        })
    }

    const handleUpdateEditMode = () => {
        setIsEditMode(!isEditMode);
    }

    const handleChangeNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    }

    const handleUpdateTask = () => {
        setIsEditMode(!isEditMode);
        tasksDispatch({
            type: 'updatedTask',
            id,
            newName
        })
    }

    const handleChangeStatus = () => {
        tasksDispatch({
            type: 'donedTask',
            id
        })
    }

    if (isEditMode) {
        taskContent = (
            <Box component='form' width='100%' onSubmit={handleUpdateTask}>
                <TextField
                    label='Имя задачи'
                    variant='standard'
                    value={newName}
                    color='primary'
                    fullWidth
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                                        <IconButton color="primary" type="submit"><DoneIcon /></IconButton>
                                    </InputAdornment>
                    }}
                    onChange={handleChangeNewName}
                />
            </Box>
        );
    } else {
        taskContent = (
            <>
                <ListItemIcon>
                    <Checkbox onChange={handleChangeStatus} checked={isDone} />
                </ListItemIcon>
                <ListItemText primary={name} />
                <Box sx={{display: "flex", gap: 2}}>
                    {
                        !isDone && (
                            <IconButton edge='end' color='primary' onClick={handleUpdateEditMode}>
                                <EditIcon />
                            </IconButton>
                        )
                    }
                    <IconButton edge='end' color='warning' onClick={handleClickDelete}>
                        <DeleteForeverIcon />
                    </IconButton>
                </Box>
            </>
        )
    }

    return (
        <ListItem
            sx={{width: '100%'}}
        >
            { taskContent }
        </ListItem>
    )
}

export default TaskItem;
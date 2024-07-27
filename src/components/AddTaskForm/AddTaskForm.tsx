import { Box, Button, InputAdornment, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { useTasksDispatch } from "../../context/TasksContext";

function AddTaskForm() {
    const [ task, setTask ] = useState('');
    const tasksDispatch = useTasksDispatch();

    const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    }

    const handleSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        tasksDispatch({
            type: 'addedTask',
            name: task
        })
        
        setTask('');
    }

    return (
        <Box component='form' width='100%' onSubmit={handleSubmitTask}>
              <TextField
                onChange={handleChangeTask}
                value={task}
                fullWidth
                required
                sx={{mb: '30px'}}
                label='Добавьте задачу'
                InputProps={{
                    endAdornment: <InputAdornment position='end'><Button type='submit' disabled={!task.trim()}><AddIcon /></Button></InputAdornment>
                }}
              />
        </Box>
    )
}

export default AddTaskForm;
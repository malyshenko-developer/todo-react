import { Box, Typography } from "@mui/material";
import List from '@mui/material/List';
import TaskItem from "./TaskItem/TaskItem";
import { useTasks } from "../../context/TasksContext";

interface TaskListProps {
    type: 'plan' | 'done'
}

function TasksList({ type }: TaskListProps) {
    const isDone = type === 'done';
    const tasks = useTasks().filter(task => task.done === isDone);
    const isExistTasks = !!tasks.length;

    return (
        <>
            {
                isExistTasks && (
                    <Box>
                        <Typography variant="h5" textTransform='uppercase' textAlign='center'>
                            { isDone ? 'Готово' : 'План' }({ tasks.length }):
                        </Typography>
                        <List sx={{width: '100%'}}>
                            {
                                tasks.map(task => (
                                    <TaskItem key={task.id} name={task.name} type={type} id={task.id} />
                                ))
                            }
                        </List>
                    </Box>
                )
            }
        </>
    )
}

export default TasksList;
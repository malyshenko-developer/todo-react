import { Box, Container, CssBaseline, Typography } from '@mui/material';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import TasksList from '../TasksList/TaskList';
import { TasksProvider } from '../../context/TasksContext';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Box sx={{ minWidth: '100%', bgcolor: '#c7f9cc', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container maxWidth='md'>
            <Box display='flex' flexDirection='column' justifyContent='center' minWidth={600} bgcolor='Background' p='30px' borderRadius={10}>
              <Typography variant='h3' textTransform='uppercase' mb='20px' textAlign='center'>
                Список дел
              </Typography>
              <TasksProvider>
                <AddTaskForm />
                <TasksList type='plan' />
                <TasksList type='done' />
              </TasksProvider>
            </Box>
        </Container>
      </Box>
    </div>
  );
}

export default App;

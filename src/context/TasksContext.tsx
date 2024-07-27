import React, { createContext, useContext, useReducer } from "react";
import ITask from "../interfaces";
import { v4 as uuid }  from 'uuid';

type ActionType =
    | { type: 'addedTask', name: string  }
    | { type: 'deletedTask', id: string }
    | { type: 'updatedTask', id: string, newName: string }
    | { type: 'donedTask', id: string }

const initialTasks: ITask[] = [];


export const TasksContext = createContext(initialTasks);
export const TasksDispatchContext = createContext<React.Dispatch<ActionType> | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [ tasks, dispatch ] = useReducer(tasksReducer, initialTasks);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                { children }
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )
}

export function useTasks() {
    const tasks = useContext(TasksContext);

    if (!tasks) {
        throw Error('error state');
    }
    
    return tasks;
}

export function useTasksDispatch() {
    const dispatch = useContext(TasksDispatchContext);

    if (!dispatch) {
        throw Error('error dispatch');
    }

    return dispatch;
}

const tasksReducer = (tasks: typeof initialTasks, action: ActionType) => {
    switch (action.type) {
        case 'addedTask':
            return [
                ...tasks,
                {
                    id: uuid(),
                    name: action.name,
                    done: false
                }
            ];
        
        case 'deletedTask':
            return tasks.filter(task => task.id !== action.id);

        case 'updatedTask':
            return tasks.map(task => {
                if (task.id === action.id) {
                    return { ...task, name: action.newName }
                }

                return task;
            });

        case 'donedTask':
            const filteredTasks = tasks.filter(task => task.id !== action.id);
            let currentTask = tasks.find(task => task.id === action.id);

            if (!currentTask) {
                return tasks;
            }

            currentTask = { ...currentTask, done: !currentTask.done }
            const isDone = currentTask.done;

            return isDone ? [ currentTask, ...filteredTasks ] : [ ...filteredTasks, currentTask ];
        
        default:
            return tasks
    }
}
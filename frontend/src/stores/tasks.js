import { defineStore } from 'pinia';
import { getRemainingTime } from '../services/date';

export const useTaskStore = defineStore({
    id: 'taskStore',
    state: () => ({
        API_URL: '/api/tasks',
    }),
    getters: {
        getTasksByStatus: state => statusId =>
            state.collection.filter(task =>
                task.status.id == statusId
            ).sort(
                (a, b) => {
                    const dateA = new Date(a.due_date).getTime();
                    const dateB = new Date(b.due_date).getTime();

                    return dateA > dateB ? 1
                        : (dateA < dateB ? -1 : b.priority.id - a.priority.id)
                }
            )
        ,
        getTasksByCategory: state => categoryId =>
            state.collection.filter(task => task.category.id == categoryId)
        ,
        completedTasks: state => state.collection.filter(task => state.isCompleted(task))
        ,
        overdueTasks: state => {
            return state.collection.filter(task => {
                const dueDate = new Date(task.due_date);
                const now = Date.now();
                return dueDate.getTime() <= now;
            });
        }
        ,
        tasksToCompleteToday: state =>
            state.collection.filter(
                task => !state.isCompleted(task) &&
                    getRemainingTime(task.due_date, 'day') < 0
            )
        ,
        isCompleted: () => task => task.status.id == 3
    }
});

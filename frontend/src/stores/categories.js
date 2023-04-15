import { defineStore } from 'pinia';

export const useCategoryStore = defineStore({
    id: 'categoryStore',
    state: () => (
        {
            API_URL: '/api/categories',
        }
    ),
    getters: {
        getAllTasks: () => (categoryId, taskStore) =>
            taskStore.collection.
                filter(task => task.category.id == categoryId)
        ,
        getCompletedTasks: (state) => (categoryId, taskStore) =>
            state.getAllTasks(categoryId, taskStore)
                .filter(task => taskStore.isCompleted(task))
        ,
        getMostCompletedCategories: state => taskStore =>
            state.collection
                .filter(
                    category => {
                        const completedTasksCount = state.getCompletedTasks(category.id, taskStore).length;
                        const allTasksCount = state.getAllTasks(category.id, taskStore).length;
                        return completedTasksCount > 0 && completedTasksCount < allTasksCount;
                    }

                )
                .sort(
                    (a, b) =>
                        state.getCompletedTasks(b.id, taskStore).length
                        - state.getCompletedTasks(a.id, taskStore).length
                )
        ,
        sortParams: state => [
            {
                name: 'Most completed',
                compareFn: (categoryA, categoryB, taskStore) => {
                    const completedTasksA = state.getCompletedTasks(categoryA.id, taskStore);
                    const completedTasksB = state.getCompletedTasks(categoryB.id, taskStore);
                    return completedTasksB.length - completedTasksA.length;
                }
            },
            {
                name: 'Most tasks',
                compareFn: (categoryA, categoryB, taskStore) => {
                    const tasksA = state.getAllTasks(categoryA.id, taskStore);
                    const tasksB = state.getAllTasks(categoryB.id, taskStore);

                    return tasksB.length - tasksA.length;
                }
            }
        ]
    },
    actions: {

    }

});

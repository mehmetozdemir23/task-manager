import { defineStore } from 'pinia';

export const usePaginationStore = defineStore({
    id: 'paginationStore',
    state: () => ({
        totalData: 0,
        currentPage: 1,
    }),
    getters: {
        pageCount: state => Math.ceil(state.totalData / state.perPage),
        perPage: state => state.totalData > 0 ? Math.min(state.totalData, 5) : 0,
        startIndex: state =>
            state.totalData > 0 ?
                Math.min(
                    Math.max(
                        (state.currentPage - 1) * state.perPage,
                        0
                    ),
                    state.totalData - state.perPage

                ) : 0
        ,
        endIndex: state =>
            state.totalData > 0 ?
                Math.max(
                    Math.min(
                        state.currentPage * state.perPage - 1,
                        state.totalData - 1
                    ),
                    state.perPage - 1
                )
                : 0
    },
    actions: {
        changePage(page) {
            this.currentPage = page;
        },
        setTotalData(totalData) {
            this.totalData = totalData;
        }
    }
});
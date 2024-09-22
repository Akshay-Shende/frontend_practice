"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pages: {pageNo: 0, limit: 0}
}

export const paginationSlice =  createSlice({
    name : "pagination",
    initialState,
    reducers :{
        addPageData : (state, action) =>{
            state.pages.pageNo = action.payload.pageNo;
            state.pages.limit  = action.payload.limit;
        }
    }
})

export const {addPageData } = paginationSlice.actions

export default paginationSlice.reducer
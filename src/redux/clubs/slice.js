import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";
import axios from "axios";

const initialStates = {
    test: [],
    tableData: [],
    status: null,
    process: null,
    reload: [],
    clubData: [],
    isSuccess: false,
    clubProfiles: {},
    totalCount: 0,
};

// ** Clubs List
export const clubsListApi = createAsyncThunk(
    "clubsListApi",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products`);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

const clubSlice = createSlice({
    name: "club",
    initialState: initialStates,
    extraReducers: {
        [clubsListApi.pending]: (state) => {
            state.status = "loading";
        },
        [clubsListApi.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.tableData = action.payload;
            state.isSuccess = false;
            state.reload = null;
            state.totalCount = action.payload.totalResults;
        },
        [clubsListApi.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
    },
    reducers: {
        clearClubProfile(state, action) {
            state.clubProfiles = action.payload
        },
        clearClubReload(state) {
            state.reload = []
        },
        clearClubList(state) {
            state.tableData = []
        }
    }
});

export const { clearClubProfile, clearClubReload, clearClubList } = clubSlice.actions

const { reducer } = clubSlice;

export default reducer;
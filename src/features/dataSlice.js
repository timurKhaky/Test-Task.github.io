import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  repositories: [],
  currentUser: null,

  totalPage: +sessionStorage.getItem("totalPage") ?? 1,
  currentPage: +sessionStorage.getItem("page") ?? 1,
  perPage: +sessionStorage.getItem("perPage") ?? 10,
};

export const fetchData = createAsyncThunk(
  "data/fetch",
  async ({ subject, currentPage, perPage }, thunkAPI) => {
    try {
      let res = await fetch(
        `https://api.github.com/search/repositories?q=${subject}&per_page=${perPage}&page=${currentPage}`
      );

      let data = await res.json();
      if (data.message) {
        return thunkAPI.rejectWithValue(data.message);
      }
      const isBlackList = sessionStorage.getItem("blackList");
      const blackList = isBlackList && JSON.parse(isBlackList);
      if (isBlackList) {
        let blockedCount = 0;
        const { items } = data;
        blockedCount = items.filter(({ id }) =>
          blackList.includes(String(id))
        ).length;
        if (items.length - blockedCount === perPage) {
          return data;
        }
        res = await fetch(
          `https://api.github.com/search/repositories?q=${subject}&per_page=${
            perPage + blockedCount
          }&page=${currentPage}`
        );
        data = await res.json();
        if (data.message) {
          return thunkAPI.rejectWithValue(data.message);
        }
        data = {
          ...data,
          items: data.items.filter(({ id }) => !blackList.includes(String(id))),
        };
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (subject, thunkAPI) => {
    try {
      let res = await fetch(`https://api.github.com/repos/${subject}`);
      let data = await res.json();
      if (data.message) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const setLoading = (state) => {
  state.isLoading = true;
  state.error = null;
};

const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.repositories = [];
  console.error("Превышен лимит запросов на API");
};

const resetState = (state) => {
  state.isLoading = false;
  state.error = null;
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    incPage: (state) => {
      state.currentPage += 1;
      sessionStorage.setItem("page", state.currentPage);
    },
    decPage: (state) => {
      state.currentPage -= 1;
      sessionStorage.setItem("page", state.currentPage);
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
      sessionStorage.setItem("page", state.currentPage);
    },
    changePerPage: (state, action) => {
      state.perPage = action.payload;
      sessionStorage.setItem("perPage", state.perPage);
    },
    clearState: (state) => {
      state.repositories = [];
      state.totalPage = 1;
      state.currentPage = 1;
      state.perPage = 10;
      sessionStorage.setItem("totalPage", 1);
      sessionStorage.setItem("page", 1);
      sessionStorage.setItem("perPage", 10);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, setLoading)
      .addCase(fetchData.rejected, setError)
      .addCase(fetchData.fulfilled, (state, action) => {
        resetState(state);
        state.repositories = action.payload.items;
        state.currentPage = sessionStorage.getItem("page")
          ? +sessionStorage.getItem("page")
          : 1;
        state.totalPage = Math.ceil(action.payload.total_count / state.perPage);
        sessionStorage.setItem("totalPage", state.totalPage);
      })
      .addCase(fetchUser.pending, setLoading)
      .addCase(fetchUser.rejected, setError)
      .addCase(fetchUser.fulfilled, (state, action) => {
        resetState(state);
        state.currentUser = action.payload;
      });
  },
});
export const { incPage, decPage, changePerPage, clearState, setPage } =
  dataSlice.actions;
export default dataSlice.reducer;

export const getData = (state) => state.data.repositories;
export const getError = (state) => state.data.error;
export const getLoading = (state) => state.data.isLoading;
export const getCurrentUser = (state) => state.data.currentUser;

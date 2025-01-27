import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
const getId = () => {
  let jwt = localStorage.getItem("project_1");
  const { id } = jwtDecode(jwt);
  return id;
};

export const fetchUserData = createAsyncThunk(
  "FETCH/User",
  async (_, { rejectWithValue }) => {
    try {
      var id = getId();
      const res = await fetch(
        `https://project-1-backend-v3.vercel.app/user/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("project_1"),
          },
        }
      );
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      return resData.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "POST/User",
  async (data, { rejectWithValue }) => {
    try {
      const id = getId();
      const res = await fetch(
        `https://project-1-backend-v3.vercel.app/user/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("project_1"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    name: "",
    email: "",
    address: "",
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        console.log(`fetchUserData.pending`);
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        console.log(`fetchUserData.fulfilled`);
        state.status = "success";
        state.name = action.payload.name;
        state.address = action.payload.address;
        state.email = action.payload.email;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        console.log(`fetchUserData.rejected`);
        state.status = "error";
        state.error = action.payload;
      });

    builder
      .addCase(updateUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.status = "success";
        state.name = action.payload.name;
        state.address = action.payload.address;
        state.email = action.payload.email;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default UserSlice;

import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const userLogin = createAsyncThunk('/user/login', async ({ role, email, password }, { rejectWithValue }) => {
      try {
        const { data } = await API.post('/user/login', { role, email, password });
        // Store token
        if (data.success) {
          toast.success(data.message);
          localStorage.setItem('token', data.token);
        //   window.location.replace("/");
        }
        return data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message);
          return rejectWithValue({ error: error.response.data.message });
        } else {
          return rejectWithValue({ error: error.message });
        }
      }
    }
  );
  
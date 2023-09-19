import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import {AuthQuery} from '../../repositories/auth_query';

const initialState: {isLogin: boolean; isLoading: boolean} = {
  isLogin: auth().currentUser != null,
  isLoading: false,
};

export const loginEmailPassword = createAsyncThunk(
  'loginEmailPassword',
  async ({email, password}: {email: string; password: string}) => {
    var result = false;
    await AuthQuery.loginEmailPassword(email, password, isSuccess => {
      if (isSuccess) {
        console.log('Login successlly');
        result = true;
      } else {
        console.log('Login failed');
        result = false;
      }
    });
    return result;
  },
);

export const registerEmailPassword = createAsyncThunk(
  'registerEmailPassword',
  async ({email, password}: {email: string; password: string}) => {
    var result = false;
    await AuthQuery.registerEmailPassword(email, password, isSuccess => {
      if (isSuccess) {
        console.log('Login successlly');
        result = true;
      } else {
        console.log('Login failed');
        result = false;
      }
    });
    return result;
  },
);

export const loginGoogle = createAsyncThunk('loginGoogle', async () => {
  var result = false;
  await AuthQuery.loginGoogle(isSuccess => {
    if (isSuccess) {
      console.log('Login successlly');
      result = true;
    } else {
      console.log('Login failed');
      result = false;
    }
  });
  return result;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(loginEmailPassword.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loginEmailPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = action.payload;
    });
    builder.addCase(loginEmailPassword.rejected, state => {
      state.isLoading = false;
      state.isLogin = false;
    });
    builder.addCase(registerEmailPassword.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(registerEmailPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = action.payload;
    });
    builder.addCase(registerEmailPassword.rejected, state => {
      state.isLoading = false;
      state.isLogin = false;
    });
    builder.addCase(loginGoogle.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loginGoogle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = action.payload;
    });
    builder.addCase(loginGoogle.rejected, state => {
      state.isLoading = false;
      state.isLogin = false;
    });
  },
  reducers: {
    signOut: state => {
      state.isLoading = false;
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

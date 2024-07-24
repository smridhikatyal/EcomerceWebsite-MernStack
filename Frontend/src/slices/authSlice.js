// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
//   // Other initial state properties related to authentication
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state) => {
//       state.isAuthenticated = true;
//       // Handle other state updates related to login (e.g., storing user data)
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       // Clear any other user-related state
//     },
//     // Additional reducers for updating user profile, tokens, etc.
//   },
// });

// export const { login, logout } = authSlice.actions;

// export default authSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
//   token: null, // optional: store token for authenticated requests
//   user: null, // optional: store user data
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.isAuthenticated = true;
//       state.token = action.payload.token; // assuming token is passed as payload
//       // Handle storing user data if needed
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.token = null;
//       state.user = null; // clear user data if stored
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    role: 'user', // Default role
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.token = null;
      state.role = 'user';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
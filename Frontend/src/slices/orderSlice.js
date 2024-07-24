
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push({ ...action.payload, orderId: state.length + 1 });
    },
    editOrder: (state, action) => {
      const order = state.find(order => order.orderId === action.payload.orderId);
      if (order) {
        order.quantity = action.payload.quantity;
      }
    },
    removeOrder: (state, action) => {
      return state.filter(order => order.orderId !== action.payload);
    },
  },
});

export const { addOrder, editOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;


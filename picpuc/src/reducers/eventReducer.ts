import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'event',
  initialState: [],
  reducers: {
    getEvent: (state, action) => {
      return action.payload;
    },
  },
});

export const { getEvent } = eventSlice.actions;

export default eventSlice.reducer;

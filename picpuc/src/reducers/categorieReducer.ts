import {createSlice} from '@reduxjs/toolkit';

const categorieSlice = createSlice({
  name: 'categorie',
  initialState: [],
  reducers: {
    getCategorie: (state, action) => {
      return action.payload;
    },
  },
});

export const {getCategorie} = categorieSlice.actions;

export default categorieSlice.reducer;

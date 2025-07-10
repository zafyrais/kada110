
import { createSlice } from '@reduxjs/toolkit';
// membuat slice
const groupSlice = createSlice({
  name: 'group', // reducer
  initialState: {
    count: 0, // init dimulai dari 0
  },
  reducers: {
    addMember: (state) => {
      state.count += 1;
    },
  },
});


export const { increment, decrement, reset } = groupSlice.actions;
export default groupSlice.reducer;
import { PlantsStateType, PlantType } from "@/types/Products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlantsStateType = {
  data: [],
};

const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    initPlants(state, action: PayloadAction<PlantType[]>) {
      state.data = action.payload;
    },
  },
});

export const { initPlants } = plantsSlice.actions;
export default plantsSlice.reducer;

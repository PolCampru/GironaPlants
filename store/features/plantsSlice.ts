import { Meta, PlantsStateType, PlantType } from "@/types/Products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlantsStateType = {
  plants: [],
  meta: {
    page: 0,
    pageCount: 0,
    total: 0,
    query: "",
  },
  loading: false,
};

const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    initPlants(
      state,
      action: PayloadAction<{ data: PlantType[]; meta: Meta; query: string }>
    ) {
      const { data, meta, query } = action.payload;
      if (meta.page !== 0 && meta.page <= meta.pageCount)
        state.plants = [...state.plants, ...data];
      else state.plants = data;

      state.meta = {
        ...state.meta,
        pageCount: meta.pageCount,
        total: meta.total,
        query,
      };
    },

    setLoading(state: PlantsStateType, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setPageScroll(state: PlantsStateType) {
      state.meta.page += 1;
    },

    resetPageScroll(state: PlantsStateType) {
      state.meta.page = 0;
    },

    setQuery(state: PlantsStateType, action: PayloadAction<string>) {
      state.plants = [];
      state.meta.query = action.payload;
      state.meta.page = 0;
    },
  },
});

export const {
  initPlants,
  setLoading,
  setPageScroll,
  resetPageScroll,
  setQuery,
} = plantsSlice.actions;

export default plantsSlice.reducer;

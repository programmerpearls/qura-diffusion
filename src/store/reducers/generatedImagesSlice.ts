// realtimeTemperatureSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

type GeneratedImagesState = string[];

const initialState: GeneratedImagesState = [];

export const generatedImagesSlice = createSlice({
    name: 'generatedImages',
    initialState,
    reducers: {
        setGeneratedImages: (state, action: PayloadAction<string[]>) => {
            return [...action.payload]; 
        },
        addGeneratedImage: (state, action: PayloadAction<string>) => {
            return [...state, action.payload]; 
        },
        removeGeneratedImage: (state, action: PayloadAction<number>) => {
            return state.filter((_, index) => index !== action.payload);
        },
        clearGeneratedImages: () => {
            return [];
        },
    },
});

export const selectGeneratedImages = (state: RootState) =>
    state.generatedImages;

export const { setGeneratedImages, addGeneratedImage, removeGeneratedImage, clearGeneratedImages } = generatedImagesSlice.actions;
export default generatedImagesSlice.reducer;

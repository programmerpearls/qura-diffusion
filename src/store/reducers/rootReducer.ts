import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import selectedGeneratedImages from './generatedImagesSlice';

const rootReducer = combineReducers({
    generatedImages: selectedGeneratedImages,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

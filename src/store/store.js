import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui/uiSlice';
// import { calendarSlice } from './calendar';

export const store = configureStore({
   reducer: {
      ui: uiSlice.reducer,
      // calendar: calendar.reducer,
   },
});

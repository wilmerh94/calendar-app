import { createSlice } from '@reduxjs/toolkit';
import { addHours, format, toDate } from 'date-fns';

const tempEvent = {
   _id: new Date().getTime(),
   title: 'Birthday Wilmer',
   notes: 'Buy cake',
   start: new Date(),
   end: addHours(new Date(), 2),
   bgColor: '#fafafa',
   user: {
      _id: '123',
      name: 'Wilmer',
   },
};

export const calendarSlice = createSlice({
   name: 'calendar',
   initialState: {
      status: 'checking', //checking ,not-auth, authenticated
      events: [tempEvent],
      activeEvent: null,
   },
   reducers: {
      onSetActiveEvent: (state, { payload }) => {
         state.activeEvent = { ...payload };
      },
      onAddNewEvent: (state, { payload }) => {
         state.events.push(payload);
         state.activeEvent = null;
      },
      onUpdateState: (state, { payload }) => {
         /* with the function map im getting a new array base on the modification inside of it
         this case if id are equals it will update if not i will be a new event */
         state.events = state.events.map((event) => {
            if (event._id === payload._id) {
               return payload;
            }
            return event;
         });
      },
      onDeleteEvent: (state) => {
         if (state.activeEvent) {
            state.events = state.events.filter(
               (event) => event._id !== state.activeEvent._id,
            );
            state.activeEvent = null;
         }
      },
   },
}); // Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateState, onDeleteEvent } =
   calendarSlice.actions;

// const formatDate = format(new Date(), 'MM/dd/yyyy hh:mm:ss');
// const formatDate = format(toDate(new Date()), 'Pp');
// const formatDate = format(new Date(), 'dd/MM/yyyy hh:mm p');
// const formatDate2 = format(toDate(addHours(new Date(), 2)), 'Pp');
// const formatDate2 = format(toDate(addHours(new Date(), 2)), 'Pp');
// const final = addHours(new Date(), 2);
// const final2 = format(final, 'dd/MM/yyyy hh:mm p');
// console.log(addHours(formatDate));

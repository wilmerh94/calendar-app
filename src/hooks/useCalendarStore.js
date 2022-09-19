import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateState } from '../store';

export const useCalendarStore = () => {
   const dispatch = useDispatch();

   const { events, activeEvent } = useSelector((state) => state.calendar);
   const setActiveEvent = (calendarEvent) => {
      dispatch(
         onSetActiveEvent({
            ...calendarEvent,
         }),
      );
   };
   const startSavingEvent = async (calendarEvent) => {
      /* TODO: save in the backend */
      console.log(calendarEvent);

      if (calendarEvent._id) {
         dispatch(onUpdateState({ ...calendarEvent }));
      } else {
         dispatch(
            onAddNewEvent({
               ...calendarEvent,
               _id: new Date().getTime(),
            }),
         );
      }
   };

   const startDeletingEvent = () => {
      dispatch(onDeleteEvent());
   };

   return {
      //Props
      activeEvent,
      events,
      hasEventSelected: !!activeEvent,
      //Method
      setActiveEvent,
      startSavingEvent,
      startDeletingEvent,
   };
};

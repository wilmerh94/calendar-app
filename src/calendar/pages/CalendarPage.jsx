import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CalendarModal, FabAdd, FabDelete, Navbar } from '../';
import { localizer, getMessages } from '../../helpers';
import { useCalendarStore, useUIStore } from '../../hooks';

export const CalendarPage = () => {
   const { openDateModal } = useUIStore();
   const { events, setActiveEvent } = useCalendarStore();
   const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

   const eventStyleGetter = () => {
      /* this function can help me with the style inside of the calendar */
      const style = {
         backgroundColor: '#347CF7',
         borderRadius: '0px',
         opacity: 0.7,
         color: 'white',
      };
      return { style };
   };

   const onDoubleClick = (e) => {
      openDateModal();
   };
   const onSelect = (event) => {
      setActiveEvent(event);
   };
   const onViewChanged = (event) => {
      localStorage.setItem('lastView', event);
      setLastView(event);
      console.log({ viewChanged: event });
   };

   return (
      <>
         <Navbar />
         <Calendar
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 'calc(100vh - 180px)' }}
            messages={getMessages()}
            eventPropGetter={eventStyleGetter}
            components={{ event: CalendarEvent }}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelect}
            onView={onViewChanged}
            defaultView={lastView}
            // defaultDate={new Date()}
         />
         <CalendarModal />
         <FabAdd />
         <FabDelete />
      </>
   );
};

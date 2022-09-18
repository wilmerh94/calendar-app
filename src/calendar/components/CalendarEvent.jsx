export const CalendarEvent = ({ event }) => {
   const { title, user } = event;
   return (
      <>
         <strong>{title}</strong>
         <span>-{user.name}</span>
      </>
   );
};

/* if you need to check props do this
export const CalendarEvent = (props) => {
   console.log(props);
   return <div>CalendarEvent</div>;
};
 */

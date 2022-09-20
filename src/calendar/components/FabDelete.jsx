import { useCalendarStore, useUIStore } from '../../hooks';
export const FabDelete = () => {
   const { isDateModalOpen } = useUIStore();

   const { startDeletingEvent, hasEventSelected } = useCalendarStore();

   const handleDelete = () => {
      startDeletingEvent();
   };
   return (
      <button
         className='btn btn-danger fab-danger'
         onClick={handleDelete}
         style={{ display: hasEventSelected || isDateModalOpen ? '' : 'none' }}>
         <i className='fas fa-trash-alt'></i>
      </button>
   );
};

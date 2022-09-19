import { addHours } from 'date-fns';
import { useCalendarStore } from '../../hooks';
import { useUIStore } from '../../hooks/useUIStore';
export const FabAdd = () => {
   const { openDateModal } = useUIStore();
   const { setActiveEvent } = useCalendarStore();

   const handleClickNew = () => {
      setActiveEvent({
         title: '',
         notes: '',
         start: new Date(),
         end: addHours(new Date(), 2),
         bgColor: '#fafafa',
         user: {
            _id: '123',
            name: 'Wilmer H',
         },
      });
      openDateModal();
   };
   return (
      <button className='btn btn-primary fab' onClick={handleClickNew}>
         <i className='fas fa-plus'></i>
      </button>
   );
};

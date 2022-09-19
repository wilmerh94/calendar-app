import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUIStore } from '../../hooks';

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {
   const { isDateModalOpen, closeDateModal } = useUIStore();
   const { activeEvent, startSavingEvent } = useCalendarStore();
   const [formSubmitted, setFormSubmitted] = useState(false);

   const [formValues, setFormValues] = useState({
      title: '',
      notes: '',
      start: new Date(),
      // end: addHours(new Date(), 2),
   });

   const titleClass = useMemo(() => {
      if (!formSubmitted) return '';
      return formValues.title.length > 0 ? '' : 'is-invalid';
   }, [formValues.title, formSubmitted]);

   useEffect(() => {
      if (activeEvent !== null) {
         setFormValues({ ...activeEvent });
      }
   }, [activeEvent]);

   const onInputChange = ({ target }) => {
      setFormValues({ ...formValues, [target.name]: target.value });
   };

   const onDateChange = (event, changing) => {
      setFormValues({ ...formValues, [changing]: event });
   };

   const onCloseModal = () => {
      /* This function tells me when i have a click outside of the modal */
      closeDateModal();
   };

   const onSubmit = async (e) => {
      e.preventDefault();

      setFormSubmitted(true);

      const difference = differenceInSeconds(formValues.end, formValues.start);

      if (isNaN(difference) || difference <= 0) {
         Swal.fire('Dates incorrect', 'Please check the date range', 'error');
         return;
      }

      if (formValues.title.length <= 0) return;
      await startSavingEvent(formValues);
      closeDateModal();
      setFormSubmitted(false);
   };

   return (
      <Modal
         style={customStyles}
         isOpen={isDateModalOpen}
         onRequestClose={onCloseModal}
         className='modal'
         overlayClassName='modal-background'
         closeTimeoutMS={200}>
         <h1> Creating Event </h1>
         <hr />
         <form className='container' onSubmit={onSubmit}>
            <div className='form-group mb-2'>
               <label>Date and time to start</label>
               <DatePicker
                  className='form-control'
                  selected={formValues.start}
                  onChange={(event) => onDateChange(event, 'start')}
                  dateFormat='dd/MM/yyyy hh:mm p'
                  showTimeSelect
               />
            </div>

            <div className='form-group mb-2'>
               <label>Date and time to end </label>
               <DatePicker
                  className='form-control'
                  selected={formValues.end}
                  onChange={(event) => onDateChange(event, 'end')}
                  dateFormat='dd/MM/yyyy hh:mm p'
                  minDate={formValues.end}
                  showTimeSelect
               />
            </div>

            <hr />
            <div className='form-group mb-2'>
               <label>Title and Notes </label>
               <input
                  type='text'
                  className={`form-control ${titleClass}`}
                  placeholder='Title'
                  name='title'
                  autoComplete='off'
                  value={formValues.title}
                  onChange={onInputChange}
               />
            </div>

            <div className='form-group mb-2'>
               <textarea
                  type='text'
                  className='form-control'
                  placeholder='Notes'
                  rows='5'
                  name='notes'
                  value={formValues.notes}
                  onChange={onInputChange}></textarea>
               <small id='emailHelp' className='form-text text-muted'>
                  Additional Information
               </small>
            </div>

            <button type='submit' className='btn btn-outline-primary btn-block'>
               <i className='far fa-save'></i>
               <span> Save</span>
            </button>
         </form>
      </Modal>
   );
};

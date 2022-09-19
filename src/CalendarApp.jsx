import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { store } from './store';

export const CalendarApp = () => {
   return (
      <BrowserRouter>
         <Provider store={store}>
            <AppRouter />
         </Provider>
      </BrowserRouter>
   );
};

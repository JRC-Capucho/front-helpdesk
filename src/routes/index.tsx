import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import LoginRoute from './login';
import HomeRout from './Home';


const Routes = () => (
   <BrowserRouter>
      <LoginRoute />
      <HomeRout />
   </BrowserRouter>
);

export default Routes;
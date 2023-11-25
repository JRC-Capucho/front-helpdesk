import React from 'react';
import { Route, Routes} from 'react-router-dom';

import Login from '../views/pages/login/login';

const LoginRoute = () => (
   <Routes>
      <Route path="/" element={<Login />} />
   </Routes>

);

export default LoginRoute;
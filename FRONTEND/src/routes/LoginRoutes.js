import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/Register')));
const RegisterBusiness = Loadable(lazy(() => import('../pages/business/RegisterBusiness/RegisterBusiness')));
const Form = Loadable(lazy(() => import('../pages/attendant/Form/Form')));
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'RegisterBusiness',
      element: <RegisterBusiness />
    },     
    {
      path: 'form/:id',
      element: <Form />
    }, 
  ]
};

export default LoginRoutes;

import { lazy, useState } from 'react';
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import { useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CreateAttendant = Loadable(lazy(() => import('../pages/business/CreateAttendant/CreateAttendant')));
const CreateForm = Loadable(lazy(() => import('../pages/business/CreateForm/CreateForm')));
const EditAttendant = Loadable(lazy(() => import('../pages/business/EditAttendant/EditAttendant.js')));
const EditBusiness = Loadable(lazy(() => import('../pages/business/EditBusiness/EditBusiness')));
const RegisterBusiness = Loadable(lazy(() => import('../pages/business/RegisterBusiness/RegisterBusiness')));
const ShowAttendants = Loadable(lazy(() => import('../pages/business/ShowAttendants/ShowAttendants')));
const VisitorReport = Loadable(lazy(() => import('../pages/business/VisitorReport/VisitorReport')));
const FillForm = Loadable(lazy(() => import('../pages/attendant/FillForm/FillForm')));
const SendLink  = Loadable(lazy(() => import('../pages/attendant/SendLink/SendLink')));
const ScanQr = Loadable(lazy(() => import('../pages/attendant/ScanQr/ScanQr')));
const ViewAttendant = Loadable(lazy(() => import('../pages/attendant/ViewAttendant/ViewAttendant')));
const FilledForms = Loadable(lazy(() => import('../pages/attendant/FilledForms/FilledForms')));
const BusinessWiseReport = Loadable(lazy(() => import('../pages/superadmin/BusinessWiseReport/BusinessWiseReport')));
const ShowBusiness = Loadable(lazy(() => import('../pages/superadmin/ShowBusiness/ShowBusiness')));
const EnableDisableBusiness = Loadable(lazy(() => import('../pages/superadmin/EnableDisableBusiness/EnableDisableBusiness')));

const userdata = JSON.parse(localStorage.getItem('userdata'));
const adminRoutes = [
  {
    path: 'ShowBusiness',
    element: <ShowBusiness />
  },
  {
    path: 'BusinessWiseReport',
    element: <BusinessWiseReport />
  },
  {
    path: 'EnableDisableBusiness',
    element: <EnableDisableBusiness />
  },
];

const businessRoutes = [
  {
    path: 'CreateForm',
    element: <CreateForm />
  },
  {
    path: 'EditAttendant',
    element: <EditAttendant />
  },
  {
    path: 'EditBusiness',
    element: <EditBusiness />
  },
  // {
  //   path: 'RegisterBusiness',
  //   element: <RegisterBusiness />
  // },
  {
    path: 'ShowAttendants',
    element: <ShowAttendants />
  },
  {
    path: 'VisitorReport',
    element: <FilledForms />
  },
  {
    path: 'CreateAttendant',
    element: <CreateAttendant />
  },
];

const attendantRoutes = [
  {
    path: 'FillForm',
    element: <FillForm />
  },
  {
    path: 'SendLink',
    element: <SendLink />
  },
  {
    path: 'ScanQr',
    element: <ScanQr />
  },
  {
    path: 'ViewAttendant',
    element: <ViewAttendant />
  },
  {
    path: 'FilledForms',
    element: <FilledForms />
  },
];
function GetRoute(userdata)
{
  // const navigate = useNavigate();
  // if (userdata) {
  //   if (userdata.role=='ADMIN') {
  //     return adminRoutes;
  //   } else if(userdata.role=='BUSINESS_OWNER') {
  //     return businessRoutes;
  //   }
  //   else if (userdata.role=='ATTENDANT') {
  //     return attendantRoutes;
  //   }
  // }
  // else
  // {
  //   // navigate('/login');
  // }
  return adminRoutes.concat(attendantRoutes,businessRoutes)

}

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: GetRoute(userdata)
};

export default MainRoutes;

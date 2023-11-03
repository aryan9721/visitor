// assets
import { DashboardOutlined } from '@ant-design/icons';
// import GenerateTicketIcon from '../assets/images/business/parkingTicket.svg';
// import VehicleRecordIcon from '../assets/images/business/VehicleRecordIcon.png';
// import { createSvgIcon } from '@mui/material';

// import SvgIcon from '@material-ui/core/SvgIcon';

// icons
const icons = {
    DashboardOutlined,
    // GenerateTicketIcon,
    // VehicleRecordIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    
    id: 'group-dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'FillForm',
            title: 'FillForm',
            type: 'item',
            url: '/FillForm',
            // icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'ScanQr',
            title: 'Scan QR',
            type: 'item',
            url: '/ScanQr',
            breadcrumbs: false
        },
        {
            id: 'SendLink',
            title: 'Send Link',
            type: 'item',
            url: '/SendLink',
            // icon: icons.VehicleRecordIcon,
            breadcrumbs: false
        },        
        {
            id: 'FilledForms',
            title: 'Filled Forms',
            type: 'item',
            url: '/FilledForms',
            // icon: icons.VehicleRecordIcon,
            breadcrumbs: false
        },
    ]
};

export default dashboard;

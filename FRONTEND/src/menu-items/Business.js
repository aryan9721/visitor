// assets
// import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //
const localdata = JSON.parse(localStorage.getItem('userdata'));

const Business = {
    id: 'Business',
    title: '',
    type: 'group',
    children: [
        {
            id: 'VisitorReport',
            title: 'Visitor Report',
            type: 'item',
            url: '/VisitorReport',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        },
        // {
        //     id: 'BusinessDashboard',
        //     title: 'Business Dashboard',
        //     type: 'item',
        //     url: '/BusinessDashboard',
        //     // icon: icons.LoginOutlined,
        //     // target: true
        //     breadcrumbs: false

        // },  
        {
            id: 'CreateAttendant',
            title: 'Create Attendant',
            type: 'item',
            url: '/CreateAttendant',
            // icon: icons.LoginOutlined,
            // target: true
            breadcrumbs: false

        },
        {
            id: 'ShowAttendants',
            title: 'Show Attendants',
            type: 'item',
            url: '/ShowAttendants',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false

        },
        {
            id: 'CreateForm',
            title: 'Create Form',
            type: 'item',
            url: '/CreateForm',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false

        },
        {
            id: 'ShowForm',
            title: 'Show Form',
            type: 'item',
            url: '/form/'+localdata.userId,
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false

        },

    ]
};

export default Business;

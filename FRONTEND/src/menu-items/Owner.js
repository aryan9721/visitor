// assets
// import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const Owner = {
    id: 'Owner',
    title: '',
    type: 'group',
    children: [
        {
            id: 'BusinessWiseReport',
            title: 'Business Wise Report',
            type: 'item',
            url: '/BusinessWiseReport',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        },
        {
            id: 'ShowBusiness',
            title: 'Show Business',
            type: 'item',
            url: '/ShowBusiness',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        },        
        {
            id: 'EnableDisableBusiness',
            title: 'Enable Disable Business',
            type: 'item',
            url: '/EnableDisableBusiness',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        },
    ]
};

export default Owner;

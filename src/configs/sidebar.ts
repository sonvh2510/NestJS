export const SIDEBAR = [
    {
        label: 'Manage Website',
        caption: 'All functions of website ',
        children: [
            {
                title: 'Dashboard',
                url: '/admin/dashboard',
            },
            {
                title: 'User',
                url: '/admin/user',
                children: [
                    {
                        title: 'List',
                        url: '/admin/user/list',
                    },
                    {
                        title: 'Create',
                        url: '/admin/user/create',
                    },
                ],
            },
            {
                title: 'Article',
                url: '/admin/post',
                children: [
                    {
                        title: 'List',
                        url: '/admin/post/list',
                    },
                    {
                        title: 'Create',
                        url: '/admin/post/create',
                    },
                ],
            },
        ],
    },
    {
        label: 'Settings',
        caption: 'All settings',
        children: [
            {
                title: 'Account Settings',
                url: '/admin/account-setting',
                children: [
                    {
                        title: 'Overview',
                        url: '/admin/account-setting/overview',
                    },
                    {
                        title: 'Appearance',
                        url: '/admin/account-setting/appearance',
                    },
                    {
                        title: 'Securities',
                        url: '/admin/account-setting/security',
                    },
                ],
            },
        ],
    },
];

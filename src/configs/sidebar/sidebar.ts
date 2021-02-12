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
                title: 'Blog',
                url: '/admin/blog',
                children: [
                    {
                        title: 'List',
                        url: '/admin/blog/list',
                    },
                    {
                        title: 'Create',
                        url: '/admin/blog/create',
                    },
                ],
            },
        ],
    },
    {
        label: 'My account',
        caption: 'Change password',
        children: [
            {
                title: 'My account',
                url: '/admin/my-account',
            },
        ],
    },
];

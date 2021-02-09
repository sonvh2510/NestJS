export const SIDEBAR = [
    {
        label: 'Navigation',
        caption: 'UI Components',
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
                children: [
                    {
                        title: 'List',
                        url: '/admin/blog',
                    },
                    {
                        title: 'Create',
                        url: '/admin/blog/create',
                    },
                ],
            },
        ],
    },
];

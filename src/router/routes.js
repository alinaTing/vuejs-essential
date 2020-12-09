export default [
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import('../components/views/auth/Register')
    },
    // 首页路由配置
    {
        path: '/',
        name: 'Home',
        alias: '/topics',
        component: () => import('../components/views/Home')
    },
    // 其他未配置的路由都跳转到首页
    {
        path: '*',
        // 重定向
        redirect: '/'
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('../components/views/auth/Login')
    },
    // EditUsers
    {
        path: '/users/1/edit',
        //name: 'EditUsers',当前路由含有子路由的时候，不需要为当前路由指定name
        component: () => import('../components/views/users/Edit.vue'),
        children:[{
            path:'',
            name:'EditProfile',
            component:()=>import('../components/views/users/Profile.vue'),
            meta:{auth:true}
        },
        {
            path:'/users/1/edit_avatar',
            name:'EditAvatar',
            component:()=>import('../components/views/users/Avatar.vue'),
            meta:{auth:true}
        },
        {
            path:'/users/1/edit_password',
            name:'EditPassword',
            component:()=>import('../components/views/users/Password.vue'),
            meta:{auth:true}
        }
            ]
    },
    // Create
    {
        path: '/articles/create',
        name:'Create',
        component: () => import('../components/views/articles/Create'),
        meta: { auth: true }
    },
    // Content
    {
        path: '/articles/:articleId/content',
        name: 'Content',
        component: () => import('../components/views/articles/Content.vue')
    },
    // Edit
    {
        path: '/articles/:articleId/edit',
        name: 'Edit',
        component: () => import('../components/views/articles/Create'),
        meta: { auth: true }
    },
    // Column
    {
        path: '/:user',
        //name: 'Column',
        component: () => import('../components/views/articles/Column'),
        children: [{
            path: '',
            name: 'Column',
            component:()=>import('../components/views/articles/List.vue')
        },
        {
            path: '/articles/:articleId/content',
            name: 'Content',
            component: () => import('../components/views/articles/Content.vue')
        }]
    },

    // Search
    {
        path: '/search',
        name: 'Search',
        component: () => import('../components/views/Search')
    },
    {
        path: '/:user',
        component: () => import('../components/views/articles/Column'),
        children: [
            {
                path: '',
                name: 'Column',
                component: () => import('../components/views/articles/List.vue')
            },
            {
                path: '/articles/:articleId/content',
                name: 'Content',
                component: () => import('../components/views/articles/Content.vue')
            }
        ]
    },

]

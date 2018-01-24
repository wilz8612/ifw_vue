import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/defend/Firewall.vue'
import Form from './views/setting/Form.vue'
import guide from './views/setting/Guide.vue'
import Page4 from './views/Monitor/Page4.vue'
import Page5 from './views/Monitor/Page5.vue'
import Page6 from './views/defend/Page6.vue'
import echarts from './views/Monitor/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '监控',
        iconCls: 'fa fa-laptop',//图标样式class
        children: [
           { path: '/echarts', component: echarts, name: '报表' },
           { path: '/', component: null, name: '调试诊断' },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '防护',
        iconCls: 'fa fa-lock',
        children: [
            { path: '/table', component: Table, name: '防火墙' },
            { path: '/page4', component: Page4, name: '入侵检测' },
            { path: '/form', component: Form, name: '工业协议' },
            { path: '/test', component: guide, name: '抗攻击' },
        ]
    },

    {
        path: '/',
        component: Home,
        name: '配置',
        iconCls: 'fa fa-tag',
        children: [
            { path: '/guide', component: guide, name: '向导' },
            { path: '/', component: null, name: '路由' },

        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];


export default routes;

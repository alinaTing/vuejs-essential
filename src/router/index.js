import Vue from 'vue'
import Router from 'vue-router'
// 引入 ./routes.js 的默认值
import routes  from './routes'

Vue.use(Router)

//可利用 History API 来完成页面跳转且无须重新加载；
const router =  new Router({
    mode: 'history',
    linkExactActiveClass: 'active',//用来添加到与当前路由对应的 <router-link> 上
    // 指定滚动行为
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            // 有锚点时，滚动到锚点
            return { selector: to.hash }
        } else if (savedPosition) {
            // 有保存位置时，滚动到保存位置
            return savedPosition
        } else {
            // 默认滚动到页面顶部
            return { x: 0, y: 0 }
        }
    },
    routes
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
    const app = router.app
    const store = app.$options.store
    const auth = store.state.auth
    // 获取目标页面路由参数里的 articleId
    const articleId = to.params.articleId
// 当前用户
    const user = store.state.user && store.state.user.name
    // 路由参数中的用户
    const paramUser = to.params.user

    app.$message.hide()

    if (
        (auth && to.path.indexOf('/auth/') !== -1) ||
        (!auth && to.meta.auth) ||
        (articleId && !store.getters.getArticleById(articleId)) ||
        // 路由参数中的用户不为当前用户，且找不到与其对应的文章时，跳转到首页
        (paramUser && paramUser !== user && !store.getters.getArticlesByUid(null, paramUser).length)
    ) {
        next('/')
    } else {
        next()
    }
})

// 注册全局后置钩子
router.afterEach((to, from) => {
    const app = router.app
    const store = app.$options.store
    const showMsg = to.params.showMsg

    if (showMsg) {
        if (typeof showMsg === 'string') {
            app.$message.show(showMsg)
        } else {
            app.$message.show('操作成功')
        }
    }
})

export default router
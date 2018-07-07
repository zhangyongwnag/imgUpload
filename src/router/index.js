import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UploadImg from '@/pages/UploadImg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'UploadImg',
      },
    },
    {
      path: '/UploadImg',
      name: 'UploadImg',
      component: UploadImg,
    }
  ]
})

import component from './Detail.vue';

let router = [
  {
    path: '/Detail/:args',
    name: 'Detail',
    component: component,
    meta: { 
      keepAlive: true // 需要被缓存
    }
  }
]

export default router;
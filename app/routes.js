export default {
 path: '/',
 indexRoute: {
   getComponent(nextState, cb) {
     require.ensure([], (require) => {
       cb(null, require('./views/list/index'))
     }, 'home')
   },
 },
 getComponent(nextState, cb) {
   require.ensure([], (require) => {
     cb(null, require('./views/main'))
   }, 'main')
 },
  // childRoutes: [
  //   { path: '/detail',
  //     getComponent: (nextState, cb) => {
  //       require.ensure([], (require) => {
  //         cb(null, require('./views/detail/index'))
  //       },'detail')
  //     }
  //   },
  //   { path: '/search',
  //     getComponent: (nextState, cb) => {
  //       require.ensure([], (require) => {
  //         cb(null, require('./views/search/index'))
  //       },'search')
  //     }
  //   },
  //   { path: '/result',
  //     getComponent: (nextState, cb) => {
  //       require.ensure([], (require) => {
  //         cb(null, require('./views/search/result'))
  //       },'result')
  //     }
  //   },
  //   { path: '/comment',
  //     getComponent: (nextState, cb) => {
  //       require.ensure([], (require) => {
  //         cb(null, require('./views/comment/index'))
  //       },'comment')
  //     }
  //   },
  //   { path: '/comment_show',
  //     getComponent: (nextState, cb) => {
  //       require.ensure([], (require) => {
  //         cb(null, require('./views/comment/show'))
  //       },'comment_show')
  //     }
  //   }
  //
  // ]
}

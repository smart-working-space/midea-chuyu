import './_window';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

//import routes from './routes';

import Main from './views/main';
import Home from './views/list/newList'; //默认首页
import MenuDetail from './views/detail/index'; //菜谱详情
// import MenuSearch from './views/search/index'; //菜谱搜索页
// import MenuSearchResult from './views/search/result'; //菜谱搜索结果页
// import MenuComment from './views/comment/index'; //菜谱评论
// import MenuCommentShow from './views/comment/show'; //菜谱评论
var _routes = (
  <Router history={hashHistory}>
      <Route component={Main} path="/" >
          <IndexRoute component={Home}/>
          <Route component={MenuDetail} path='detail/:id' />
          {/* <Route component={MenuComment} path='comment/:id' />
          <Route component={MenuSearch} path='search' />
          <Route component={MenuSearchResult} path='result' />
          <Route component={MenuCommentShow} path='comment_show' /> */}
      </Route>
  </Router>
);


// var _routes = (
//   <Router history={hashHistory} routes={routes} />
// );

ReactDOM.render(_routes, document.getElementById('app-root'));

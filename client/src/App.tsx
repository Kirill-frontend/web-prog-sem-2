import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { connect, useDispatch, useSelector } from 'react-redux';

import Home from './pages/Home';
import Create from './pages/Create';
import Favorite from './pages/Favorite';
import Auth from './pages/Auth';
import Profile from './pages/Profile/Profile';
import MyPosts from './pages/Profile/MyPosts';
import Registrate from './pages/Registrate';
import Search from './pages/Search';
import GlobalLoader from './components/GlobalLoader'
import { RootState } from './redux/store';
import { auth } from './redux/slicers/auth.slice';



import 'materialize-css/dist/css/materialize.css'
import "materialize-css/dist/js/materialize"
import { hideToast } from './redux/slicers/toast.slice';


function App() {
  // materialize.AutoInit()

  const dispatch = useDispatch()
  const toastMessage = useSelector((state: RootState) => state.toast.message)
  const toastView = useSelector((state: RootState) => state.toast.show)
  const isLoading = useSelector((state: RootState) => state.loading.globalLoading)


  useEffect(() => {
    dispatch(auth())
  }, [dispatch])

  useEffect(() => {
    if (toastView) {
      
      // dispatch(hideToast())
    }
  }, [toastMessage, toastView, dispatch])

  if (isLoading) {
    return <GlobalLoader />
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/create" component={Create} />
          <Route path="/favorite" component={Favorite} />
          <Route path="/auth" component={Auth} />
          <Route path="/register" component={Registrate} />
          <Route path="/profile" component={Profile} />
          <Route path="/my" component={MyPosts} />
          <Route path="/search" component={Search} />          
        </Switch>
      </Router>
    </>
  );
}

export default connect(null, null)(App);

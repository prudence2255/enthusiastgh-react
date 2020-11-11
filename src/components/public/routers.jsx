import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Home from './home';
import Header from './header';
import Footer from './footer';
import NotFound from './notFound';
import About from './about';
import Category from './category';
import Post from './post';
import Search from './search';
import Login from '../admin/login';
import Dashboard from '../admin/Dashboard';
import Navigation from '../admin/Navigation';
import AdminHeader from '../admin/AdminHeader';
import AuthRoute from './privateRoute';
import Posts from '../admin/Posts';
import PostView from '../admin/PostView';
import NewPost from '../admin/NewPost';
import NewUser from '../admin/NewUser';
import UserProfile from '../admin/UserProfile';
import Users from '../admin/Users';
import PasswordReset from '../admin/PasswordReset';
import NewCategory from '../admin/NewCategory';
import Categories from '../admin/Categories';
import ForgotPassword from '../admin/ForgotPassword';
import SendEmail from '../admin/SendEmail';
import Privacy from './Privacy';


   
const Routers = ({history}) => {
    const isAdmin = history.location.pathname.includes('admin');
    return(
        <>
        {!isAdmin && <Header />}
            <Switch>
                {/* <Route exact path="/admin/dev">
                    <Login />
                </Route>
                <Route exact path="/admin/password/find/:token">
                    <ForgotPassword />
                </Route>
                <Route exact path="/admin/send-email">
                    <SendEmail />
                </Route>
                <AuthRoute path="/admin">
                    <AdminHeader />
                     <Navigation />
                     <div className="admin offset-md-2">
                     <div className="dashboard">
                     <AuthRoute exact path="/admin">
                            <Dashboard />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/posts">
                            <Posts />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/posts/:id/view">
                            <PostView />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/posts/create">
                            <NewPost />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/posts/:id/edit">
                            <NewPost />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/users/create">
                            <NewUser />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/users/:id/profile">
                            <UserProfile />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/users">
                            <Users />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/users/:id/edit">
                            <NewUser />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/users/reset">
                            <PasswordReset />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/categories/create">
                            <NewCategory />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/categories/:id/edit">
                            <NewCategory />
                        </AuthRoute>
                        <AuthRoute exact path="/admin/categories">
                            <Categories />
                        </AuthRoute>
                        </div>
                     </div>
                </AuthRoute> */}
                <Route exact path="/">
                     <Home />
                </Route>
                <Route exact path="/posts/search">
                     <Search />
                </Route>
                <Route exact path="/categories/:id/:name">
                    <Category />
                </Route>
                <Route exact path="/Archive/:id/:title">
                    <Post />
                </Route>
                 <Route exact path="/about">
                     <About />
                 </Route>
                 <Route exact path="/privacy">
                     <Privacy />
                 </Route>
                 <Route>
                    <NotFound />
                </Route>
            </Switch>
            {!isAdmin &&  <Footer /> }
      </>
      
    )
}

export default withRouter(Routers);
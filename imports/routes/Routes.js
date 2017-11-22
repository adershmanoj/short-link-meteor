import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import Signup from '../ui/Signup'; 
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
const unauthenticatedPages=['/','/signup'];
const authenticatedPages=['/links'];
const onEnterPublicPage=()=>{
    if(Meteor.userId())
        browserHistory.replace('/links');
}
const onEnterPrivatePage=()=>{
    if(!Meteor.userId())
        browserHistory.replace('/');
}
export const onAuthChange=(isAuthenticated)=>{
    const pathname=window.location.pathname;
    const isAuthenticatedPage=authenticatedPages.includes(pathname);
    const isUnauthenticatedPage=unauthenticatedPages.includes(pathname);
    if(isAuthenticated && isUnauthenticatedPage)
        browserHistory.replace('/links');
    if(!isAuthenticated && isAuthenticatedPage)
        browserHistory.replace('/');
};
export const routes=(
    <Router history={browserHistory}>
        <Route path='/signup' component={Signup} onEnter={onEnterPublicPage}/>  
        <Route path='/links' component={Link} onEnter={onEnterPrivatePage}/>
        <Route path='/' component={Login} onEnter={onEnterPublicPage}/>
        <Route path='*' component={NotFound}/>
    </Router>
);
import React from 'react';
import {Route , Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'; 

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import AuthenticationPage from './pages/authentication/authentication.component';
import CheckoutPage from './pages/checkoutPage/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from '../src/firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.action';

import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
       if(userAuth){
         const userRef = await createUserProfileDocument(userAuth);

         userRef.onSnapshot(snapshot => {
           setCurrentUser({
               id:snapshot.id,
               ...snapshot.data()
           });
         })
       }
       else{
         setCurrentUser(userAuth);
       }
    });
  }
  
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render= {() => this.props.currentUser ? (<Redirect to='/'/>) : (<AuthenticationPage/>)} />
  
        </Switch>  
        
        
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);

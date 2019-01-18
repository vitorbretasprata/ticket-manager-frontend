import React, { Component } from 'react';
import LoginTemplate from '../components/templates/loginTemplate';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import SetAuthorizationToken from '../components/utils/setAuthorizationToken'
import { URL } from '../components/utils/consts'

class LoginApp extends Component{
    constructor(){
        super();
        this.login = this.login.bind(this);
        this.state = {
            paramEmail: '',
            paramPassword: '',
            failedLogin: false,
            isLogged: false       
        }
    }

    login(e){
        e.preventDefault();
        const remember = e.target.rememberMe.checked;    
        this.setState({
            paramEmail: e.target.email.value,
            paramPassword: e.target.password.value
        }, () => {
            Axios.post(URL, 
                {
                    email: this.state.paramEmail,
                    password: this.state.paramPassword                    
                }).then((response) => {
                    const token = response.data.token;
                    if(remember == true){
                        localStorage.setItem('token_id', token);                         
                    } else if (remember == false) {
                        sessionStorage.setItem('token_id', token);                     
                    }
                    this.setState({
                        isLogged: true
                    })
                }).catch(error => {
                    this.setState({ failedLogin: true })
                    console.log(error);
            })
        });        
    }

    render(){
        const { isLogged } = this.state;
        if(isLogged){
            return <Redirect to='/home' />
        } else {
            return(
                <LoginTemplate 
                failedLogin={this.state.failedLogin}            
                sourcePathImage="../src/images/logo.png" 
                height="80" 
                width="250"
                classname="loginImage" 
                loginFunc={this.login}/>
            )
        }        
    }
}

export default LoginApp


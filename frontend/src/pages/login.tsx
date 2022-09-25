import React from 'react';
import logo from '../assets/logo.png';

class LoginPage extends React.Component
{
    render (){
        return (
            <div>
                <div>
                    <img src={logo} alt=''></img>
                </div>
                <form>
                    <div>
                        LOGIN PAGE
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginPage;
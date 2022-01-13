import { auth, provider } from '../database/Config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './Login.css'

const Login = ({ setIsAuth }) => {
    const [error, setError] = useState()
    const navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localStorage.setItem('isAuth', true);
            setIsAuth(true);
            setError(false);
            navigate(-1);
        }).catch((e) => {
            setError(e.message)
        })
    }
    return (
        <section className='dark' >
            <div className="inner-width">
                <div className="loginPage">
                    <h1 className="section-title">Login</h1>
                    {/* <p>Sing In With Google to Continue</p> */}
                    {error && <div>Oops... <br /> {error} <br /> Check connection <br /> <br /> </div>}
                    <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google to Continue</button>
                </div>
            </div>
        </section>
    );
}

export default Login;
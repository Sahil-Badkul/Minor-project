import { auth, provider } from '../database/Config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = ({ setIsAuth }) => {
    const navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localStorage.setItem('isAuth', true);
            setIsAuth(true);
            navigate("/");
        })
    }
    return (
        <div className="loginPage">
            <p>Sing In With Google to Continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
}

export default Login;
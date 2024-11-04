import React, { useEffect, useState } from 'react';
import authStyles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';
import { auth, signIn, signUp } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const signInText = 'Sign In';
const signUpText = 'Sign Up';

const Auth: React.FC = () => {
    const [isNewUser, setIsNewUser] = useState<boolean>(false);
    const [authButtonText, setAuthButtonText] = useState<string>(signInText);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            navigate('/app');
        }
        if (error) {
            console.error(error);
        }
    }, [user, loading, error, navigate]);
    const completeSignInOrSignUp = () => {
        isNewUser ? signUp(name, email, password) : signIn(email, password);
    };

    const toggleForm = (): void => {
        if (signInText === authButtonText) {
            setIsNewUser(true);
            setAuthButtonText(signUpText);
        } else {
            setIsNewUser(false);
            setAuthButtonText(signInText);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    return (
        <div className={authStyles.boxAuth}>
            <div className={authStyles.boxAuthContainer}>
                <label className={authStyles.title}>Just Food Online Shop</label>
                {isNewUser && (
                    <input
                        type="text"
                        className={authStyles.inputAuth}
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Full Name"
                    />
                )}
                <input
                    type="text"
                    className={authStyles.inputAuth}
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    className={authStyles.inputAuth}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                />
                <button className={authStyles.btnAuth} onClick={completeSignInOrSignUp}>
                    {authButtonText}
                </button>
                {!isNewUser && (
                    <div className={authStyles.messageAuth}>
                        New to Just Food?
                        <span className={authStyles.linkAuth} onClick={toggleForm}>
                            Click to {signUpText}
                        </span>
                    </div>
                )}
                {isNewUser && (
                    <div className={authStyles.messageAuth}>
                        Already on Just Food?
                        <span className={authStyles.linkAuth} onClick={toggleForm}>
                            Click to {signInText}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Auth;

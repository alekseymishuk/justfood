import appStyles from './styles/App.module.css';
import React, { useEffect, useState } from 'react';
import Foods from './foods/Foods';
import { auth, logOut } from './auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import type { MenuItem } from './types/MenuItem';
import { menuItems } from './data';
export const foodItemsContext = React.createContext<MenuItem[]>([]);

const App = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [isChooseFoodPage, setIsChooseFoodPage] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>('');

    const togglePage = () => {
        setIsChooseFoodPage(!isChooseFoodPage);
    };

    useEffect(() => {
        if (user) {
            setUserEmail(user.email);
            if (user.email === process.env.REACT_APP_ADMIN_EMAIL) {
                setIsAdmin(true);
            }
        } else {
            navigate('/');
        }
        if (error) {
            console.warn(error);
            alert(error);
        }
    }, [user, loading, error, navigate]);
    return (
        <foodItemsContext.Provider value={menuItems}>
            <div className={appStyles.App}>
                <button className={appStyles.signOutButton} onClick={logOut}>
                    Sign Out
                </button>
                {isAdmin && (
                    <button className={appStyles.toggleButton} onClick={togglePage}>
                        {isChooseFoodPage ? 'Availability Check' : 'Order Food'}
                    </button>
                )}
                <span className={appStyles.signedInMessage}>Signed in as {userEmail}</span>
                <h3 className={appStyles.title}>Just Food Online Shop</h3>
                {!isChooseFoodPage && (
                    <>
                        <h4 className={appStyles.subTitle}>Menu Availability</h4>
                        <ul className={appStyles.ulApp}>
                            {menuItems.map(item => {
                                return (
                                    <li key={item.id} className={appStyles.liApp}>
                                        {item.name} - {item.quantity}
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
                {isChooseFoodPage && <Foods foodItems={menuItems}></Foods>}
            </div>
        </foodItemsContext.Provider>
    );
};

export default App;

import React, { useState, ChangeEvent } from 'react';
import { useContext } from 'react';
import { foodItemsContext } from '../App';
import ErrorFunctionalBoundary from '../error/ErrorFunctionalBoundary';
import foodOrderStyles from '../styles/FoodOrder.module.css';
import type { MenuItem } from '../types/MenuItem';

interface FoodOrderProps {
    food: MenuItem;
    returnToMenu: () => void;
}

const FoodOrder: React.FC<FoodOrderProps> = props => {
    const selectedFood = props.food;
    const [quantity, setQuantity] = useState<number>(1);
    const [totalAmount, setTotalAmount] = useState<number>(selectedFood.price);
    const [isOrdered, setIsOrdered] = useState<boolean>(false);
    const [isErrorCatched, setIsErrorCatched] = useState<boolean>(false);

    const menuItems = useContext(foodItemsContext);

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const newQuantity = parseInt(event.target.value, 10);
            setTotalAmount(selectedFood.price * newQuantity);
            setQuantity(newQuantity);
        } catch {
            setIsErrorCatched(true);
        }
    };

    const handleClick = () => {
        setIsOrdered(true);
        menuItems.forEach(item => {
            if (item.id === selectedFood.id) {
                item.quantity = item.quantity - quantity;
            }
        });
    };

    return (
        <>
            {isErrorCatched === false && (
                <>
                    <h4 className={foodOrderStyles.selFoodTitle}>{selectedFood.name}</h4>
                    <img
                        className={foodOrderStyles.selFoodImg}
                        src={require(`../images/${selectedFood.image}`)}
                        alt={selectedFood.name}
                    />
                    <ul className={foodOrderStyles.ulFoodDetails}>
                        <li>
                            <p className={foodOrderStyles.selFoodDesc}>{selectedFood.desc}</p>
                        </li>
                        <li>
                            <p className={foodOrderStyles.selFoodPrice}>{totalAmount}$</p>
                        </li>
                        <li className={foodOrderStyles.selQuantity}>
                            <label>Quantity</label>
                            <input
                                type="number"
                                defaultValue={1}
                                className={foodOrderStyles.quantity}
                                min="1"
                                max="10"
                                onChange={handleQuantityChange}
                            />
                        </li>
                        <li className={foodOrderStyles.liDetails}>
                            <label htmlFor="name"></label>
                            <input
                                type="text"
                                className={foodOrderStyles.inputFields}
                                id="name"
                                name="name"
                                placeholder="Your Name"
                            />
                        </li>
                        <li>
                            <label htmlFor="mobile"></label>
                            <input
                                type="text"
                                className={foodOrderStyles.inputFields}
                                id="mobile"
                                name="mobile"
                                placeholder="Your mobile number"
                            />
                        </li>
                        <li>
                            <button
                                className={`${foodOrderStyles.btn} ${foodOrderStyles.btnOrder}`}
                                onClick={handleClick}
                            >
                                Submit Order
                            </button>
                            <button
                                className={`${foodOrderStyles.btn} ${foodOrderStyles.btnReturnMenu}`}
                                onClick={props.returnToMenu}
                            >
                                Return to Menu
                            </button>
                        </li>
                        {isOrdered && (
                            <li className={foodOrderStyles.liMessage}>
                                <label>
                                    Order Submitted! You will receive an SMS once it's ready for
                                    pickup.
                                </label>
                            </li>
                        )}
                    </ul>
                </>
            )}
            {isErrorCatched && <ErrorFunctionalBoundary />}
        </>
    );
};

export default FoodOrder;

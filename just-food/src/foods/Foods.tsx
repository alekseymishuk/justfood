import React, { useState } from 'react';
import foodStyles from '../styles/Foods.module.css';
import FoodOrder from '../foodOrder/FoodOrder';
import type { MenuItem } from '../types/MenuItem';

type FoodsProps = {
    foodItems: MenuItem[];
};

const Foods: React.FC<FoodsProps> = ({ foodItems }) => {
    const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);

    const handleSelect = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if (!event.currentTarget.dataset.id) return;
        const selectedId = parseInt(event.currentTarget.dataset.id || '0');
        const indexOfSelectedFood = foodItems.findIndex(item => item.id === selectedId);
        if (indexOfSelectedFood === -1) return;
        setSelectedFood(foodItems[indexOfSelectedFood]);
    };

    const returnToMenu = () => {
        setSelectedFood(null);
    };

    return (
        <>
            {!selectedFood && (
                <>
                    <h4 className={foodStyles.foodTitle}>Choose from our Menu</h4>
                    <ul className={foodStyles.ulFoods}>
                        {foodItems.map(item => {
                            return (
                                <li
                                    key={item.id}
                                    className={foodStyles.liFoods}
                                    data-id={item.id}
                                    onClick={handleSelect}
                                >
                                    <img
                                        className={foodStyles.foodImg}
                                        src={require(`../images/${item.image}`)}
                                        alt={item.name}
                                    />
                                    <div className={foodStyles.foodItem}>
                                        <p className={foodStyles.foodDesc}>{item.desc}</p>
                                        <p className={foodStyles.foodPrice}>{item.price}$</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
            {selectedFood && <FoodOrder food={selectedFood} returnToMenu={returnToMenu} />}
        </>
    );
};

export default Foods;

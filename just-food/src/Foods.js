import React, { Fragment, useState } from "react";
import foodStyles from "./Foods.module.css";
import FoodOrder from "./FoodOrder";
const Foods = ({ foodItems }) => {
  const [selectedFood, setSelectedFood] = useState("");
  const handleSelect = (event) => {
    setSelectedFood(
      foodItems.find((item) => {
        return item.id === parseInt(event.currentTarget.dataset.id);
      })
    );
  };

  return (
    <Fragment>
      {!selectedFood && (
        <Fragment>
          <h4 className={foodStyles.foodTitle}>Choose from our Menu</h4>
          <ul className={foodStyles.ulFoods}>
            {foodItems.map((item) => {
              return (
                <li
                  key={item.id}
                  className={foodStyles.liFoods}
                  data-id={item.id}
                  onClick={handleSelect}
                >
                  <img
                    className={foodStyles.foodImg}
                    src={require(`./images/${item.image}`)}
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
        </Fragment>
      )}
      {selectedFood && (
        <FoodOrder
          food={selectedFood}
          returnToMenu={() => setSelectedFood("")}
        />
      )}
    </Fragment>
  );
};

export default Foods;

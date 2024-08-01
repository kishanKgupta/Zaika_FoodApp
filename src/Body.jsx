import React from "react";
import resData from "./component/resData";
import Card from "./Card";
import { useState } from "react";

const Body = () => {
  let initialRestaurants = resData();

  const [restaurant, setRestaurant] = useState(initialRestaurants);
  const [topRated,setTopRated] = useState(false);
   const [showPizzaHut, setShowPizzaHut] = useState(false);

  return (
    // <h1>hello</h1>
    <>
      <div className="body">
        <div>
          <h2 style={{ fontFamily: "Roboto, serif" }}>Our Top Restaurant </h2>
          <p style={{ fontFamily: "Roboto, serif" }}>
            Try our top recipes curated just for you.
          </p>
        </div>
        <div className="search"> 🔍 Search</div>
      </div>
      <div className="filter">
        <h2>Filter</h2>
        <button
          onClick={() => {
            if (topRated)
            {
              setRestaurant(initialRestaurants);
            }
            else {
              let filterList = restaurant.filter(
                (res) => res.info.avgRating > 4.4
              );
              setRestaurant(filterList);
            }
            setTopRated(!topRated);
          }}
        >
          Top rated Restaurant
        </button>
        <button
          onClick={() => {
            setRestaurant(initialRestaurants);
          }}
        >
          All Restaurant
        </button>
        <button
          onClick={() => {
            let kfc = restaurant.filter((res) => res.info.name == "KFC");
            setRestaurant(kfc);
          }}
        >
          KFC 
        </button>
        <button
          onClick={() => {
            if (showPizzaHut) {
              setRestaurant(initialRestaurants);
            } else {
              let pizzaHut = restaurant.filter((res) => res.info.name === "Pizza Hut");
              setRestaurant(pizzaHut);
            }
            setShowPizzaHut(!showPizzaHut);
          }}
        >
          Pizza Hut
        </button>
      </div>
      <div className="res-Container">
        {restaurant.map((info) => (
          <Card key={info.info.id} restaurant={info.info} />
        ))}
      </div>
    </>
  );
};

export default Body;

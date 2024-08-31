import React, { useState, useEffect } from "react";
import ShimmerCard from "./ShimmerCard";
import SVG from "./component/starSvg";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "./utils/useRestaurantMenu";

function RestaurantMenu() {
  const { resId } = useParams();
  const {menuInfo,loading,error} = useRestaurantMenu(resId);

  if (loading) {
    return (
      <div className="shimmerUI">
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  //whole info about restaurant
  const resInfo = menuInfo?.data?.cards[2]?.card?.card?.info;

  //whole info about Menu Data
  const menuData = menuInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;
  console.log(menuData);

  if (!menuData) {
    console.warn("Card data not available");
    return <p>Menu items not available.</p>;
  }

  return (
    <div className="menu">
      <div className="res-data">
        <h1>{resInfo?.name}</h1>
      </div>
      <div className="menu-data">
        <div>
          <h1>---------Menu List----------</h1>
        </div>
        <div className="cat-1">
          <h1>{menuData?.cards[1]?.card?.card?.title}</h1>
          {menuData?.cards[1]?.card?.card?.itemCards?.map((res) => (
            <div key={res?.card?.info?.id} className="menu-card">
              <div>
                <h3>{res?.card?.info?.name}</h3>
                <p>
                  {res?.card?.info?.price / 100 ||
                    res?.card?.info?.defaultPrice / 100}{" "}
                  Rs
                </p>
                <p className="menu-rating">
                  {SVG}
                  {res?.card?.info?.ratings?.aggregatedRating?.rating || 4.8}
                </p>
                <p>{res?.card?.info?.description}</p>
              </div>
              <div>
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${res?.card?.info?.imageId}`}
                  alt="food"
                  className="menu-img"
                />
              </div>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;

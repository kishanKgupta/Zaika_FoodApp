import React, { useState, useEffect } from "react";
import ShimmerCard from "./ShimmerCard";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";

function RestaurantMenu() {
  const { resId } = useParams();
  const { menuInfo, loading, error } = useRestaurantMenu(resId);

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
    <div className="flex flex-col m-10">
      {/* Restaurant Name Section */}
      <div className="border border-black p-8 text-2xl">
        <h1>{resInfo?.name || "Restaurant Name Not Available"}</h1>
      </div>

      {/* Menu List Section */}
      <div>
        <div className="flex justify-center text-center text-2xl mt-6">
          <h1>Menu List</h1>
        </div>

        <div>
          <h1>{menuData?.cards[1]?.card?.card?.title || "No Category"}</h1>

          {menuData?.cards[1]?.card?.card?.itemCards?.length > 0 ? (
            menuData?.cards[1]?.card?.card?.itemCards.map((res) => (
              <div key={res?.card?.info?.id} className="menu-card">
                <div>
                  <h3>{res?.card?.info?.name || "No Name Available"}</h3>
                  <p>
                  {res?.card?.info?.price / 100 ||
                    res?.card?.info?.defaultPrice / 100}{" "}
                    Rs
                  </p>
                  <p className="menu-rating">
                    🌟{" "}
                    {res?.card?.info?.ratings?.aggregatedRating?.rating ||
                      "No Rating"}
                  </p>
                  <p>
                    {res?.card?.info?.description || "No description available"}
                  </p>
                </div>
                <div>
                  {res?.card?.info?.imageId ? (
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/${res?.card?.info?.imageId}`}
                      alt={res?.card?.info?.name}
                      className="menu-img"
                    />
                  ) : (
                    <p>No Image Available</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No menu items available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;

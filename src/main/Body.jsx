import React, { useState, useEffect } from "react";
import Card from "../card/Card.jsx";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import ShimmerCard from "../card/ShimmerCard.jsx";

const Body = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Fetch restaurant data
  const fetchData = async () => {
    try {
      const response = await fetch("https://zaika-cca76.web.app/data.json");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const json = await response.json();
      const newData =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      if (newData) {
        setRestaurant(newData);
        setFilteredRestaurant(newData);
      } else {
        console.error("Data not found in the expected structure.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search food

  useEffect(() => {
    if (!restaurant.length) return;

    // ✅ Move Fuse instance inside useEffect
    const fuse = new Fuse(restaurant, {
      keys: ["info.name", "info.description"],
      threshold: 0.3,
    });

    let result = searchText.trim()
      ? fuse.search(searchText).map(({ item }) => item)
      : restaurant;

    setFilteredRestaurant(result);
  }, [searchText, restaurant]);

  //shimmer effect
  if (loading) {
    return (
      <div className="shimmerUI">
        {[...Array(6)].map((_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-evenly items-center gap-2 text-xs mt-4 mb-4 sm:text-xl sm:gap-4 bg-slate-300 sm:ml-10 sm:mr-10 sm:mt-4 sm:mb-4 ">
        <button
          className="p-1"
          onClick={() => {
            const filterData = filteredRestaurant.filter(
              (res) => Number(res.info.avgRatingString) > 4.5
            );
            console.log(filterData);
            setFilteredRestaurant(filterData);
          }}
        >
          Top rated Restaurant
        </button>
        <button onClick={() => setFilteredRestaurant(restaurant)}>
          All Restaurant
        </button>
        <button
          onClick={() => {
            const filterData = filteredRestaurant.filter(
              (res) => res.info.name == "KFC"
            );
            console.log(filterData);
            setFilteredRestaurant(filterData);
          }}
        >
          KFC
        </button>
        <button
          onClick={() => {
            const filterData = filteredRestaurant.filter(
              (res) => res.info.name == "Pizza Hut"
            );
            console.log(filterData);
            setFilteredRestaurant(filterData);
          }}
        >
          Pizza Hut
        </button>
      </div>

      {/* Search box */}
      <div className="flex justify-around items-center m-2 gap-2">
        <div className="m-2">
          <h1 className="text-lg sm:text-2xl mb-2">Our Top Restaurant</h1>
          <p className="text-xs  sm:text-lg">Try our top recipes curated just for you.</p>
        </div>
        <div className="border border-slate-600">
          <input
            className="text-center w-36 sm:p-2"
            type="text"
            placeholder="Search Food"
            onChange={(e) => setSearchText(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Card Data */}
      <div className="flex justify-evenly items-center flex-wrap gap-4">
        {filteredRestaurant.length > 0 ? (
          filteredRestaurant.map((res) => (
            <Link to={`/restaurant/${res.info.id}`} key={res.info.id}>
              <Card restaurant={res.info} />
            </Link>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </>
  );
};

export default Body;

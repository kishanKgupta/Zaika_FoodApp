import React, { useState, useEffect } from "react";
import Card from "./Card";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";
import useOnlineStatus from "./utils/useOnlineStatus";

const Body = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [topRated, setTopRated] = useState(false);
  const [showPizzaHut, setShowPizzaHut] = useState(false);
  const [showKfc, setShowKfc] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const onlineStatus = useOnlineStatus();

  if (onlineStatus == false) return <h1>you are offline.</h1>
 
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      const newData =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
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

  const options = {
    keys: ["info.name", "info.description"],
    threshold: 0.3,
  };

  const fuse = new Fuse(restaurant, options);

  const applyFilters = (data) => {
    let filteredData = data;

    if (topRated) {
      filteredData = filteredData.filter((res) => res.info.avgRating > 4.4);
    }

    if (showPizzaHut) {
      filteredData = filteredData.filter(
        (res) => res.info.name === "Pizza Hut"
      );
    }

    if (showKfc) {
      filteredData = filteredData.filter((res) => res.info.name === "KFC");
    }

    return filteredData;
  };

  const handleSearch = () => {
    let result;
    if (searchText.trim() !== "") {
      result = fuse.search(searchText).map(({ item }) => item);
    } else {
      result = restaurant;
    }
    setFilteredRestaurant(applyFilters(result));
  };

  useEffect(() => {
    handleSearch();
  }, [searchText, topRated, showPizzaHut, showKfc]);

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

  return (
    <>
      <div className="header-1">
        <h1
          className="App-header"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Welcome to Zaika
        </h1>
      </div>
      <div className="body">
        <div>
          <h2 style={{ fontFamily: "Roboto, serif" }}>Our Top Restaurant </h2>
          <p style={{ fontFamily: "Roboto, serif" }}>
            Try our top recipes curated just for you.
          </p>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Pizza..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="searchBtn" onClick={handleSearch}>
            🔍
          </button>
        </div>
      </div>
      <div className="filter">
        <h2>Filter</h2>
        <button
          onClick={() => {
            setTopRated((prev) => !prev);
          }}
        >
          Top rated Restaurant
        </button>
        <button
          onClick={() => {
            setSearchText("");
            setTopRated(false);
            setShowPizzaHut(false);
            setShowKfc(false);
            setFilteredRestaurant(restaurant);
          }}
        >
          All Restaurant
        </button>
        <button
          onClick={() => {
            setShowKfc((prev) => !prev);
          }}
        >
          KFC
        </button>
        <button
          onClick={() => {
            setShowPizzaHut((prev) => !prev);
          }}
        >
          Pizza Hut
        </button>
      </div>
      <div className="res-Container">
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

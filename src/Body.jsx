import React, { useState, useEffect } from "react";
import Card from "./Card";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";

const Body = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [topRated, setTopRated] = useState(false);
  const [showPizzaHut, setShowPizzaHut] = useState(false);
  const [showKfc, setShowKfc] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();

      // Adjust the path according to the actual response structure
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

  const options = {
    keys: ["info.name", "info.description"],
    threshold: 0.3, // Adjust this value to be more or less strict
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
      <>
        <div className="shimmerUI">
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </div>
      </>
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
          filteredRestaurant.map((info) => (
            <Link to={"/restaurant/"+ info.info.id}>
              <Card key={info.info.id} restaurant={info.info} />
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

// import React, { useState, useEffect } from "react";
// import resData from "./component/resData";
// import Card from "./Card";
// import Fuse from "fuse.js";

// const Body = () => {
//   const [restaurant, setRestaurant] = useState([]);
//   const [filteredRestaurant, setFilteredRestaurant] = useState([]);
//   const [topRated, setTopRated] = useState(false);
//   const [showPizzaHut, setShowPizzaHut] = useState(false);
//   const [showKfc, setShowKfc] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const json = await response.json();
//       console.log(json);

//       // Adjust the path according to the actual response structure
//       const newData =
//         json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
//           ?.restaurants;
//       if (newData) {
//         setRestaurant(newData);
//         setFilteredRestaurant(newData);
//       } else {
//         console.error("Data not found in the expected structure.");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []); // Added an empty dependency array to ensure it runs once

//   const options = {
//     keys: ["info.name", "info.description"],
//     threshold: 0.3, // Adjust this value to be more or less strict
//   };

//   const fuse = new Fuse(restaurant, options);

//   const applyFilters = (data) => {
//     let filteredData = data;

//     if (topRated) {
//       filteredData = filteredData.filter((res) => res.info.avgRating > 4.4);
//     }

//     if (showPizzaHut) {
//       filteredData = filteredData.filter(
//         (res) => res.info.name === "Pizza Hut"
//       );
//     }

//     if (showKfc) {
//       filteredData = filteredData.filter((res) => res.info.name === "KFC");
//     }

//     return filteredData;
//   };

//   const handleSearch = () => {
//     let result;
//     if (searchText.trim() !== "") {
//       result = fuse.search(searchText).map(({ item }) => item);
//     } else {
//       result = restaurant;
//     }
//     setFilteredRestaurant(applyFilters(result));
//   };

//   useEffect(() => {
//     handleSearch(); // Apply search whenever searchText changes
//   }, [searchText, topRated, showPizzaHut, showKfc]); // Depend on filters and searchText

//   return (
//     <>
//       <div className="body">
//         <div>
//           <h2 style={{ fontFamily: "Roboto, serif" }}>Our Top Restaurant </h2>
//           <p style={{ fontFamily: "Roboto, serif" }}>
//             Try our top recipes curated just for you.
//           </p>
//         </div>
//         <div className="search">
//           <input
//             type="text"
//             placeholder="Pizza..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <button className="searchBtn" onClick={handleSearch}>
//             🔍
//           </button>
//         </div>
//       </div>
//       <div className="filter">
//         <h2>Filter</h2>
//         <button
//           onClick={() => {
//             setTopRated((prev) => !prev);
//           }}
//         >
//           Top rated Restaurant
//         </button>
//         <button
//           onClick={() => {
//             setSearchText("");
//             setTopRated(false);
//             setShowPizzaHut(false);
//             setShowKfc(false);
//             setFilteredRestaurant(restaurant);
//           }}
//         >
//           All Restaurant
//         </button>
//         <button
//           onClick={() => {
//             setShowKfc((prev) => !prev);
//           }}
//         >
//           KFC
//         </button>
//         <button
//           onClick={() => {
//             setShowPizzaHut((prev) => !prev);
//           }}
//         >
//           Pizza Hut
//         </button>
//       </div>
//       <div className="res-Container">
//         {filteredRestaurant.length > 0 ? (
//           filteredRestaurant.map((info) => (
//             <Card key={info.info.id} restaurant={info.info} />
//           ))
//         ) : (
//           <p>No results found</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Body;

// import React, { useState, useEffect } from "react";
// import resData from "./component/resData";
// import Card from "./Card";
// import Fuse from "fuse.js";

// const Body = () => {
//   // let initialRestaurants = resData();
//   const [restaurant, setRestaurant] = useState([]);
//   const [topRated, setTopRated] = useState(false);
//   const [showPizzaHut, setShowPizzaHut] = useState(false);
//   const [showKfc, setShowKfc] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const json = await response.json();
//       console.log(json);

//       // Adjust the path according to the actual response structure
//       const newData =json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
//         ?.restaurants;
//       setRestaurant(newData);

//       // if (newData) {
//       //   setRestaurant(newData);
//       // } else {
//       //   console.error("Data not found in the expected structure.");
//       // }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []); // Added an empty dependency array to ensure it runs once

//   const options = {
//     keys: ["info.name", "info.description"],
//     threshold: 0.3, // Adjust this value to be more or less strict
//   };

//   const fuse = new Fuse(restaurant, options);

//   const applyFilters = (data) => {
//     let filteredData = data;

//     if (topRated) {
//       filteredData = filteredData.filter((res) => res.info.avgRating > 4.4);
//     }

//     if (showPizzaHut) {
//       filteredData = filteredData.filter(
//         (res) => res.info.name === "Pizza Hut"
//       );
//     }

//     if (showKfc) {
//       filteredData = filteredData.filter((res) => res.info.name === "KFC");
//     }

//     return filteredData;
//   };

//   const handleSearch = () => {
//     let result;
//     if (searchText.trim() !== "") {
//       result = fuse.search(searchText).map(({ item }) => item);
//     } else {
//       result = restaurant;
//     }
//     setRestaurant(applyFilters(result));
//   };

//   useEffect(() => {
//     handleSearch(); // Apply search whenever searchText changes
//   }, [searchText, topRated, showPizzaHut, showKfc]); // Depend on filters and searchText

//   return (
//     <>
//       <div className="body">
//         <div>
//           <h2 style={{ fontFamily: "Roboto, serif" }}>Our Top Restaurant </h2>
//           <p style={{ fontFamily: "Roboto, serif" }}>
//             Try our top recipes curated just for you.
//           </p>
//         </div>
//         <div className="search">
//           <input
//             type="text"
//             placeholder="Pizza..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <button className="searchBtn" onClick={handleSearch}>
//             🔍
//           </button>
//         </div>
//       </div>
//       <div className="filter">
//         <h2>Filter</h2>
//         <button
//           onClick={() => {
//             setTopRated((prev) => !prev);
//           }}
//         >
//           Top rated Restaurant
//         </button>
//         <button
//           onClick={() => {
//             setSearchText("");
//             setTopRated(false);
//             setShowPizzaHut(false);
//             setShowKfc(false);
//             setRestaurant(restaurant);
//           }}
//         >
//           All Restaurant
//         </button>
//         <button
//           onClick={() => {
//             setShowKfc((prev) => !prev);
//           }}
//         >
//           KFC
//         </button>
//         <button
//           onClick={() => {
//             setShowPizzaHut((prev) => !prev);
//           }}
//         >
//           Pizza Hut
//         </button>
//       </div>
//       <div className="res-Container">
//         {restaurant.length > 0 ? (
//           restaurant.map((info) => (
//             <Card key={info.info.id} restaurant={info.info} />
//           ))
//         ) : (
//           <p>No results found</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Body;

// import React, { useState,useEffect } from "react";
// import resData from "./component/resData";
// import Card from "./Card";
// import Fuse from "fuse.js";

// const Body = () => {
//   let initialRestaurants = resData();
//   const [restaurant, setRestaurant] = useState([]);
//   const [topRated, setTopRated] = useState(false);
//   const [showPizzaHut, setShowPizzaHut] = useState(false);
//   const [showKfc, setShowKfc] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const json = await response.json();

//       // Adjust the path according to the actual response structure
//       const newData =
//         json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
//           ?.restaurants;
//       console.log(newData);
//       if (newData) {
//         setRestaurant(newData);
//       } else {
//         console.error("Data not found in the expected structure.");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   });

//   const options = {
//     keys: ["info.name", "info.description"],
//     threshold: 0.3, // Adjust this value to be more or less strict
//   };

//   const fuse = new Fuse(initialRestaurants, options);

//   const applyFilters = (data) => {
//     let filteredData = data;

//     if (topRated) {
//       filteredData = filteredData.filter((res) => res.info.avgRating > 4.4);
//     }

//     if (showPizzaHut) {
//       filteredData = filteredData.filter(
//         (res) => res.info.name === "Pizza Hut"
//       );
//     }

//     if (showKfc) {
//       filteredData = filteredData.filter((res) => res.info.name === "KFC");
//     }

//     return filteredData;
//   };

//   const handleSearch = () => {
//     let result;
//     if (searchText.trim() !== "") {
//       result = fuse.search(searchText).map(({ item }) => item);
//     } else {
//       result = initialRestaurants;
//     }
//     setRestaurant(applyFilters(result));
//   };

//   return (
//     <>
//       <div className="body">
//         <div>
//           <h2 style={{ fontFamily: "Roboto, serif" }}>Our Top Restaurant </h2>
//           <p style={{ fontFamily: "Roboto, serif" }}>
//             Try our top recipes curated just for you.
//           </p>
//         </div>
//         <div className="search">
//           <input
//             type="text"
//             placeholder="Pizza..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <button className="searchBtn" onClick={handleSearch}>
//             🔍
//           </button>
//         </div>
//       </div>
//       <div className="filter">
//         <h2>Filter</h2>
//         <button
//           onClick={() => {
//             setTopRated((prev) => {
//               const newState = !prev;
//               setRestaurant(applyFilters(initialRestaurants));
//               return newState;
//             });
//           }}
//         >
//           Top rated Restaurant
//         </button>
//         <button
//           onClick={() => {
//             setSearchText("");
//             setTopRated(false);
//             setShowPizzaHut(false);
//             setShowKfc(false);
//             setRestaurant(initialRestaurants);
//           }}
//         >
//           All Restaurant
//         </button>
//         <button
//           onClick={() => {
//             setShowKfc((prev) => {
//               const newState = !prev;
//               setRestaurant(applyFilters(initialRestaurants));
//               return newState;
//             });
//           }}
//         >
//           KFC
//         </button>
//         <button
//           onClick={() => {
//             setShowPizzaHut((prev) => {
//               const newState = !prev;
//               setRestaurant(applyFilters(initialRestaurants));
//               return newState;
//             });
//           }}
//         >
//           Pizza Hut
//         </button>
//       </div>
//       <div className="res-Container">
//         {restaurant.length > 0 ? (
//           restaurant.map((info) => (
//             <Card key={info.info.id} restaurant={info.info} />
//           ))
//         ) : (
//           <p>No results found</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Body;

// import React, { useState } from "react";
// import resData from "./component/resData";
// import Card from "./Card";
// import Fuse from "fuse.js";

// const Body = () => {
//   let initialRestaurants = resData();
//   const [restaurant, setRestaurant] = useState(initialRestaurants);
//   const [topRated, setTopRated] = useState(false);
//   const [showPizzaHut, setShowPizzaHut] = useState(false);
//   const [showKfc, setShowKfc] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const options = {
//     keys: ["info.name", "info.description"],
//     threshold: 0.3, // Adjust this value to be more or less strict
//   };

//   const fuse = new Fuse(initialRestaurants, options);

//   const applyFilters = (data) => {
//     let filteredData = data;

//     if (topRated) {
//       filteredData = filteredData.filter((res) => res.info.avgRating > 4.4);
//     }

//     if (showPizzaHut) {
//       filteredData = filteredData.filter(
//         (res) => res.info.name == "Pizza Hut"
//       );
//     }

//     if (showKfc) {
//       filteredData = filteredData.filter(
//         (res) => res.info.name == "KFC"
//       );
//     }
//     return filteredData;
//   };

//   const handleSearch = () => {
//     let result;
//     if (searchText.trim() !== "") {
//       result = fuse.search(searchText).map(({ item }) => item);
//     } else {
//       result = initialRestaurants;
//     }
//     setRestaurant(applyFilters(result));
//   };

//   return (
//     <>
//       <div className="body">
//         <div>
//           <h2 style={{ fontFamily: "Roboto, serif" }}>Our Top Restaurant </h2>
//           <p style={{ fontFamily: "Roboto, serif" }}>
//             Try our top recipes curated just for you.
//           </p>
//         </div>
//         <div className="search">
//           <input
//             type="text"
//             placeholder="Pizza..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <button className="searchBtn" onClick={handleSearch}>
//             🔍
//           </button>
//         </div>
//       </div>
//       <div className="filter">
//         <h2>Filter</h2>
//         <button
//           onClick={() => {
//             setTopRated(!topRated);
//             setRestaurant(applyFilters(initialRestaurants));
//           }}
//         >
//           Top rated Restaurant
//         </button>
//         <button
//           onClick={() => {
//             setRestaurant(initialRestaurants);
//             setSearchText("");
//             setTopRated(false);
//             setShowPizzaHut(false);
//           }}
//         >
//           All Restaurant
//         </button>
//         <button
//           onClick={() => {
//             setShowKfc(!showKfc);
//             setRestaurant(applyFilters(initialRestaurants));
//           }}
//         >
//           KFC
//         </button>
//         <button
//           onClick={() => {
//             setShowPizzaHut(!showPizzaHut);
//             setRestaurant(applyFilters(initialRestaurants));
//           }}
//         >
//           Pizza Hut
//         </button>
//       </div>
//       <div className="res-Container">
//         {restaurant.length > 0 ? (
//           restaurant.map((info) => (
//             <Card key={info.info.id} restaurant={info.info} />
//           ))
//         ) : (
//           <p>No results found</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Body;

// import React, { useEffect } from "react";
// import resData from "./component/resData";
// import Card from "./Card";
// import { useState } from "react";
// import Fuse from "fuse.js";

// const Body = () => {
//   let initialRestaurants = resData();
//   const [restaurant, setRestaurant] = useState(initialRestaurants);
//   const [topRated, setTopRated] = useState(false);
//   const [showPizzaHut, setShowPizzaHut] = useState(false);

//   // const fetchData = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! Status: ${response.status}`);
//   //     }

//   //     const json = await response.json();

//   //     // Adjust the path according to the actual response structure
//   //     const newData =
//   //       json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
//   //         ?.restaurants;

//   //     if (newData) {
//   //       setRestaurant(newData);
//   //     } else {
//   //       console.error("Data not found in the expected structure.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   const [searchText, setSearchText] = useState("");

//   const options = {
//     keys: ["name", "description"],
//     threshold: 0.3, // Adjust this value to be more or less strict
//   };

//   const fuse = new Fuse(initialRestaurants, options);

//  const handleSearch = () => {
//    if (searchText.trim() !== "") {
//      const result = fuse.search(searchText);
//     setRestaurant(result.map(({ item }) => item));

//    }
//  };

//   return (
//     <>
//       <div className="body">
//         <div>
//           <h2 style={{ fontFamily: "Roboto, serif" }}>Our Top Restaurant </h2>
//           <p style={{ fontFamily: "Roboto, serif" }}>
//             Try our top recipes curated just for you.
//           </p>
//         </div>
//         <div className="search">
//           <input
//             type="text"
//             placeholder="Pizza..."
//             value={searchText}
//             onChange={(e) => {
//             setSearchText(e.target.value);
//             }}
//           />
//           <button
//             className="searchBtn"
//             onClick={handleSearch}
//             //   onClick={() => {
//             //     const filterData = initialRestaurants.filter((res) => res.info.name === searchText
//             //     );
//             //     setRestaurant(filterData);
//             //   }}
//           >
//             🔍
//           </button>
//         </div>
//       </div>
//       <div className="filter">
//         <h2>Filter</h2>
//         <button
//           onClick={() => {
//             if (topRated) {
//               setRestaurant(initialRestaurants);
//             } else {
//               let filterList = restaurant.filter(
//                 (res) => res.info.avgRating > 4.4
//               );
//               setRestaurant(filterList);
//             }
//             setTopRated(!topRated);
//           }}
//         >
//           Top rated Restaurant
//         </button>
//         <button
//           onClick={() => {
//             setRestaurant(initialRestaurants);
//           }}
//         >
//           All Restaurant
//         </button>
//         <button
//           onClick={() => {
//             let kfc = restaurant.filter((res) => res.info.name == "KFC");
//             setRestaurant(kfc);
//           }}
//         >
//           KFC
//         </button>
//         <button
//           onClick={() => {
//             if (showPizzaHut) {
//               setRestaurant(initialRestaurants);
//             } else {
//               let pizzaHut = restaurant.filter(
//                 (res) => res.info.name === "Pizza Hut"
//               );
//               setRestaurant(pizzaHut);
//             }
//             setShowPizzaHut(!showPizzaHut);
//           }}
//         >
//           Pizza Hut
//         </button>
//       </div>
//       <div className="res-Container">
//         {restaurant.map((info) => (
//           <Card key={info.info.id} restaurant={info.info} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default Body;

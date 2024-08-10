import React, { useState, useEffect } from "react";
import ShimmerCard from "./ShimmerCard";
import SVG from "./component/starSvg";
import { useParams } from "react-router-dom";

function RestaurantMenu() {
  const { resId } = useParams();
  const [menuInfo, setMenuInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const menuData = await response.json();
       console.log("Fetched Menu Data:", menuData); // Log the fetched data
      setMenuInfo(menuData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  //console.log("Menu Info State:", menuInfo); // Log to see if menuInfo is populated

  const resInfo = menuInfo?.data?.cards[2]?.card?.card?.info;
  const menuData = menuInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;

  // const testData =
  //   menuInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
  //     ?.card?.categories;
  // console.log(testData);

  if (!menuData) {
    console.warn("Card data not available");
    return <p>Menu items not available.</p>; // Fallback if data is not available
  }

  return (
    <div className="menu">
      <div className="res-data">
        <h1>{resInfo?.name}</h1>
      </div>
      <div className="menu-data">
        <div className="">
          <h1>---------Menu List----------</h1>
        </div>
        <div className="cat-1">
          <h1>{menuData?.cards[2]?.card?.card?.title}</h1>
          {menuData?.cards[2]?.card?.card?.categories[0]?.itemCards?.map((res) => {
            return (
              <div key={res.card.info.id} className="menu-card">
                <div>
                  <h3>{res.card.info.name}</h3>
                  <p>
                    {res.card.info.price / 100 ||
                      res.card.info.defaultPrice / 100}
                    {" Rs"}
                  </p>
                  <p className="menu-rating">
                    {SVG}
                    {res.card.info.ratings.aggregatedRating.rating || 4.8}{" "}
                  </p>
                  <p>{res.card.info.description}</p>
                </div>
                <div>
                  <img
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/" +
                      res.card.info.imageId
                    }
                    alt="food"
                    className="menu-img"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;

// import React, { useState, useEffect } from "react";
// import ShimmerCard from "./ShimmerCard";

// function RestaurantMenu() {
//   const [menuInfo, setMenuInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=393840&catalog_qa=undefined&submitAction=ENTER"
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const menuData = await response.json();
//       setMenuInfo(menuData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="shimmerUI">
//         <ShimmerCard />
//         <ShimmerCard />
//         <ShimmerCard />
//         <ShimmerCard />
//         <ShimmerCard />
//         <ShimmerCard />
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const menuData = menuInfo?.data?.cards[2]?.card?.card?.info;
//   const cardData =
//     menuInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
//       ?.card?.itemCards;
//   console.log(cardData);

//   return (
//     <div className="menu">
//       <h1>{menuData?.name}</h1>
//       <div className="menu-data">
//         <p>..........Menu List..........</p>
//         {cardData?.length > 0 ? (
//           cardData.map((res) => (
//             <p key={res.card.info.id} className="resMenu">
//               {res.card.info.name}
//             </p>
//           ))
//         ) : (
//           <p>No items available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RestaurantMenu;

// // import React, { useState, useEffect } from "react";
// // import ShimmerCard from "./ShimmerCard";

// // function RestaurantMenu() {
// //   const [menuInfo, setMenuInfo] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const fetchData = async () => {
// //     try {
// //       const response = await fetch(
// //         "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=393840&catalog_qa=undefined&submitAction=ENTER"
// //       );
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! Status: ${response.status}`);
// //       }
// //       const menuData = await response.json();
// //       setMenuInfo(menuData);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //       setError(error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <>
// //         <div className="shimmerUI">
// //           <ShimmerCard />
// //           <ShimmerCard />
// //           <ShimmerCard />
// //           <ShimmerCard />
// //           <ShimmerCard />
// //           <ShimmerCard />
// //         </div>
// //       </>
// //     );
// //   }

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   const menuData = menuInfo?.data?.cards[2]?.card?.card?.info;
// //   const cardData =
// //     menuInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
// //       ?.card?.itemCards;

// //   return (
// //     <div className="menu">
// //       <h1>{menuData.name}</h1>
// //       <div className="menu-data">
// //         <p>..........Menu List..........</p>
// //         {cardData.map((res) => {
// //           return <p className="resMenu">{res.card.info.name}</p>;
// //         })}

// //       </div>
// //     </div>
// //   );
// // }

// // export default RestaurantMenu;

// // import React, { useState } from "react";
// // import { useEffect } from "react";

// // function RestaurantMenu() {
// //   const [menuInfo, setMenuInfo] = useState([]);

// //   const fetchData = async () => {
// //     const response = await fetch(
// //       "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=393840&catalog_qa=undefined&submitAction=ENTER"
// //     );
// //     if (!response.ok) {
// //       throw new Error(`HTTP error! Status: ${response.status}`);
// //     }
// //     const menuData = await response.json();
// //     console.log("fetchData : ", menuData);
// //     setMenuInfo(menuData);
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   console.log("usestate Data : ", menuInfo?.data?.cards[0]?.card?.card?.text);
// //   const { text } = menuInfo?.data?.cards[0]?.card?.card;
// //   return (
// //     <>
// //       <div className="menu">
// //         {/* <h1>{menuInfo.data.cards[0].card.card}</h1> */}
// //         <h1>{text}</h1>
// //       </div>
// //     </>
// //   );
// // }

// // export default RestaurantMenu;

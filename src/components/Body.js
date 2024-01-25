//body of app
import RestoCard from "./RestoCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [RestaurantList, setRestaurantList] = useState([]);
  const [filterSearchData, setFilterSearchData] = useState([]);

  //use effect
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //to solve CORS ERROR WE must add cors extension to browser
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.3007589&lng=85.82942589999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    console.log(json);

    setRestaurantList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterSearchData(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const [filterBtn, setfilterBtn] = useState("Top-Rated Restaurants");

  const [searchData, setSearchData] = useState("");

  console.log("page rendered");

  return RestaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search">
        <input
          type="text"
          className="search-box"
          value={searchData}
          onChange={(val) => setSearchData(val.target.value)}
        />
        <button
          className="search-btn"
          onClick={() => {
            console.log(searchData);
            const filterSearchData = RestaurantList.filter((data) =>
              data.info.name.toLowerCase().includes(searchData.toLowerCase())
            );
            setFilterSearchData(filterSearchData);
          }}
        >
          Search
        </button>
      </div>
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filterList = RestaurantList.filter(
              (res) => res.info.avgRating > 4.5
            );
            setFilterSearchData(filterList);
            filterBtn === "Top-Rated Restaurants"
              ? setfilterBtn("Back to Home")
              : setfilterBtn("Top-Rated Restaurants");
          }}
        >
          {filterBtn}
        </button>
      </div>
      <div className="resto-container">
        {filterSearchData.map((restaurant) => (
          <RestoCard resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};
export default Body;

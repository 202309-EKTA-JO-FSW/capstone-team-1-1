"use client";
import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { fetchRestaurantMenuItems, fetchSearchMenuItem } from "@/app/lib/data";
import { CiFilter } from "react-icons/ci";

const RestaurantMenu = ({ id, searchTxt }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentType, setCurrentType] = useState("");

  // fetch data
  useEffect(() => {
    const getMenuItems = async () => {
      if (!searchTxt) {
        setLoading(true);
        const menuItemsData = await fetchRestaurantMenuItems(id);
        setMenuItems(menuItemsData);
        setLoading(false);
      }
    };
    getMenuItems();
  }, [id]);

  // search menu items
  useEffect(() => {
    const getMenuItems = async () => {
      if (searchTxt) {
        setLoading(true);
        const searchMenuItemsData = await fetchSearchMenuItem(id, searchTxt);
        setMenuItems(searchMenuItemsData);
        setLoading(false);
      }
    };
    getMenuItems();
  }, [searchTxt]);

  if (menuItems.message) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-2xl font-bold text-main-green">
        <p>{menuItems.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-2xl font-bold text-main-green">
        <p>Loading...</p>
      </div>
    );
  }

  if (menuItems.length === 0) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-2xl font-bold text-main-green">
        <p>No Menu Items Found</p>
      </div>
    );
  }

  // filter menuItems

  const types = [];
  menuItems.forEach((item) => {
    if (!types.includes(item.type)) {
      types.push(item.type);
    }
  });

  console.log(currentType);

  const handleFilter = (type) => {
    setCurrentType(type);
  };

  const currentTypeColor = (type) => {
    if (currentType === type) {
      return "bg-light-green border-main-green";
    } else {
      return "bg-transparent border-gray-300";
    }
  };

  return (
    <div className="flex flex-col items-start w-full min-h-[400px] px-2 md:px-20 my-10">
      <div className="flex items-center text-base">
        <div className="border-2 border-gray-300 rounded-full p-3 mr-2">
          <CiFilter />
        </div>
        {types.map((type, i) => (
          <div key={i} onClick={() => handleFilter(type)}>
            <p
              className={`border-2 rounded-full p-2 mr-2 cursor-pointer hover:bg-light-green hover:border-main-green ${currentTypeColor(
                type
              )}`}
            >
              {type}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center md:justify-start w-full min-h-[400px]">
        {menuItems.map((item) => (
          <div key={item._id}>
            <MenuItemCard key={item.id} menuItem={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;

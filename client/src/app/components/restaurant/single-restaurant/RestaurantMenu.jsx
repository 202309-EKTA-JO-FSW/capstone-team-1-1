"use client"
import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { fetchMenuItem } from "@/app/lib/data";
import Pagination from "../Pagination";

const RestaurantMenu = ({ id }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { menuItems, totalPages, currentPage } = await fetchMenuItem(id, currentPage);
        setMenuItems(menuItems);
        setTotalPages(totalPages);
        setCurrentPage(currentPage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentPage]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const renderMenuItems = (items) => (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <MenuItemCard key={item.id} menuItem={item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      {menuItems.length > 0 ? (
        <>
          {renderMenuItems(menuItems)}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePagination={handlePagination}
          />
        </>
      ) : (
        <div className="h-[500px] flex items-center justify-center text-xl text-main-green">
          <p>No menu items found.</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;



"use client";
import React, { useState, useEffect } from "react";
import { fetchAdminMenuItem, fetchMenuItem } from "@/app/lib/data";

import MenuItemCard from "./MenuItemCard";
import Link from "next/link";
import Btn from "../../Btn";
import Empty from "../../Empty";
import Loading from "../../loading/Loading";

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMenuItems = async () => {
      setLoading(true);
      const menuItemsData = await fetchAdminMenuItem();

      setMenuItems(menuItemsData);
      setLoading(false);
    };
    getMenuItems();
  }, []);

  const handleDelete = async (deletedItem) => {
    const updatedMenuItems = menuItems.filter((item) => item !== deletedItem);
    setMenuItems(updatedMenuItems);
    const menuItemsData = await fetchAdminMenuItem();
    setMenuItems(menuItemsData);
    // getMenuItems();
  };

  const handleUpdate = async () => {
    setLoading(true);
    const menuItemsData = await fetchAdminMenuItem();
    setMenuItems(menuItemsData);
    setLoading(false);
  };
  return (
    <div className=" flex flex-col justify-center w-full p-5 md:mx-2 border border-white">
      <h1 className="items-center font-bold text-3xl mb-2 text-center">
        Menu Items
      </h1>
      {/* display loading */}
      {loading && <Loading />}
      {/* display empty cart */}
      {menuItems.length === 0 && (
        <Empty text={"Restaurant doesn't have any menu items"} />
      )}
      {/* diplay menuItems */}
      <div className="flex flex-wrap sm:p-2 p-3">
        {menuItems.length > 0 &&
          menuItems.map((menuItem) => (
            <MenuItemCard
              key={menuItem._id}
              menuItem={menuItem}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
      </div>
      <div className="flex justify-center mt-10s">
        <Link href="/my-restaurant/menuItems/newMenuItem">
          <Btn text="Add Item" />
        </Link>
      </div>
    </div>
  );
}

export default MenuItems;

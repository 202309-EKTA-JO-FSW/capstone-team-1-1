import React from "react";

const SidebarBtn = ({ content, pathname }) => {
  let active;
  if (pathname === `/my-restaurant${content.path}`) {
    active = "bg-white";
  } else {
    active = "bg-transparent";
  }
  return (
    <div className={`sidebar-btn ${active}`}>
      <div>{content.icon}</div>
      <p className="pl-2 capitalize">{content.name}</p>
    </div>
  );
};

export default SidebarBtn;

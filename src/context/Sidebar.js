import React from "react";

export const SidebarContext = React.createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

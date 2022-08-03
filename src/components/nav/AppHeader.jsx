import React, { useContext } from "react";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import WestIcon from "@mui/icons-material/West";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../../context/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getLabels } from "../../store/slices/label.slice";
import { getContacts } from "../../store/slices/contacts.slice";
import { authService } from "../../services/auth.service";
import { setAuth, setLoggedIn } from "../../store/slices/auth.slice";
export default function AppHeader() {
  const dispatch = useDispatch();
  const [showsearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const logged_in = useSelector((state) => state.authentication.logged_in);
  const user = useSelector((state) => state.authentication.user);
  const stopClickOutside = () => {
    document
      .querySelector("body")
      .removeEventListener("click", handleClickOutside);
  };

  const navigate = useNavigate();
  const location = useLocation()

 
  useEffect(() => {
    document
      .querySelector("body")
      .addEventListener("click", handleClickOutside);
    return stopClickOutside;
  }, [showsearch]);

  const handleClickOutside = (event) => {
    const isClickInsideSearch = event
      .composedPath()
      .includes(document.querySelector("#g"));
    if (isClickInsideSearch) {
      return console.log("you clicked inside");
    } else {
      console.log("click outside");
      stopClickOutside();
      //   check if the click was made by search button
      const isClickBySearchButton = event
        .composedPath()
        .includes(document.querySelector("#search"));
      if (!isClickBySearchButton) {
        setShowSearch(false);
      }
    }
  };

  const handleClick = () => {
    setShowSearch(true);
  };

  const handleSearchChange = (ev) => {
    setSearch(ev.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const closeSearch = () => {
    setShowSearch(false);
  };
  const sidebar_context = useContext(SidebarContext);
  return (
    <div className="pb-16 bg-white">
      <header className="lg:grid flex grid-cols-10 gap-2 lg:w-full fixed z-10 bg-white">
        <div title="hover" className="lg:col-span-2 flex gap-2 py-3">
          <div className="ml-3">
            <IconButton
              aria-label="menu"
              onClick={() => {
                console.log("open sidebar");
                sidebar_context.toggleSidebar(!sidebar_context.isSidebarOpen);
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div>
            <NavLink to="/">
              <div className="flex gap-2">
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/contacts_48dp.png"
                  className="w-10 hidden lg:block"
                />
                <div className="text-xl md:text-[22px] text-google-gray self-center pt-1">
                  Contacts
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        {/* <div className="text-xl">{count}</div> */}
        <div className="lg:col-span-6 bg-white rounded-lg ">
          <Paper
            component="form"
            className="h-[70%] w-[80%] my-2 hidden lg:block rounded-force"
          >
            <div className="absolute z-10 mt-1 ml-2">
              <IconButton aria-label="menu">
                <SearchIcon />
              </IconButton>
            </div>

            <Input
              className="h-full pl-[10%] font-thin rounded-lg"
              disableUnderline
              placeholder="Search"
              autoFocus
              fullWidth
              id="outlined-search"
              label="Search field"
            />
          </Paper>

          {showsearch ? (
            <Paper
              id="g"
              component="form"
              className="h-[5%] w-[63%] my-2 z-10 absolute top-0 left-0 pl-1 rounded-2xl"
            >
              <Input
                disableUnderline
                className="h-full pl-[6%]  font-thin rounded-2xl"
                placeholder="Search"
                autoFocus
                fullWidth
                onChange={(ev) => handleSearchChange(ev)}
                value={search}
                id="outlined-search"
                label="Search field"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={closeSearch}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <WestIcon />
                    </IconButton>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={clearSearch}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Paper>
          ) : (
            "."
          )}
        </div>
        <div className="py-3 md:py-0 ml-10 lg:hidden">
          <IconButton id="search" aria-label="menu" onClick={handleClick}>
            <SearchIcon />
          </IconButton>
        </div>
        <div className="lg:col-span-2">
          <div className="flex lg:justify-between lg:mx-3 py-3 ">
            <div className="flex lg:gap-4">
              <Tooltip title="Help Menu" placement="bottom">
                <IconButton aria-label="menu">
                  <HelpOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings Menu" placement="bottom">
                <IconButton aria-label="menu">
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className="flex gap-4 ">
              <div className="hidden lg:block">
                <Tooltip title="Google Apps" placement="bottom">
                  <IconButton aria-label="menu">
                    <AppsRoundedIcon />
                  </IconButton>
                </Tooltip>
              </div>
              {logged_in && (
                <div className="ml">
                  <Tooltip
                    title={`
                  CONTACT ACCOUNT \n
                  ${user.email}
                  ${user.displayName}
                  `}
                    placement="bottom"
                  >
                    <IconButton aria-label="menu">
                      <div className="rounded-full font-bold uppercase text-sm bg-blue-500 text-white w-8 h-8 items-center flex justify-center text-center">
                        {user.displayName[0]}
                      </div>
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

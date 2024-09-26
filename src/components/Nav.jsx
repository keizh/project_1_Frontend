import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { setCategory } from "../features/Product/ProductSlice";
import { useSelector, useDispatch } from "react-redux";
import ProfileMenu from "../components/Profile";

import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Badge,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

const navListMenuItems = [
  {
    title: "All",
    description: "Stylish Clothes for All",
    icon: GiClothes,
  },
  {
    title: "Unisex",
    description: "Stylish, versatile clothing for everyone.",
    icon: IoMaleFemaleOutline,
  },
  {
    title: "Men",
    description: "Bold, modern styles for every man.",
    icon: FaMale,
  },
  {
    title: "Women",
    description: "Elegant, trendy fashion for all women.",
    icon: FaFemale,
  },
  {
    title: "Kids",
    description: "Fun, comfortable clothes for kids.",
    icon: FaChildren,
  },
];

function NavListMenu() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <NavLink to={location.pathname == "/" ? "" : "/"} key={key}>
        <MenuItem
          onClick={() =>
            // setTimeout(dispatch(fetchByCategory({ category: title })), 1000)
            dispatch(setCategory({ category: title }))
          }
          className="flex items-center gap-3 rounded-lg"
        >
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </NavLink>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Categories
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-2 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  const { WishList } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  console.log(
    `component updated , cart : ${cart.length}  , wishlist:${WishList.length}`
  );

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row gap-[10px] lg:p-1">
      <Typography variant="small" color="blue-gray" className="font-medium">
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <NavLink to="/">Home</NavLink>
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography variant="small" color="blue-gray" className="font-medium">
        <NavLink to="/wishlist">
          <Badge content={WishList.length}>
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              WishList
            </ListItem>
          </Badge>
        </NavLink>
      </Typography>
      <Typography variant="small" color="blue-gray" className="font-medium">
        <NavLink to="/cart">
          <Badge content={cart.length}>
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Cart
            </ListItem>
          </Badge>
        </NavLink>
      </Typography>
      {/* <Typography variant="small" color="blue-gray" className="font-medium">
        {" "}
        <Button onClick={onClickLogOutHandler} size="sm" color="red">
          Log Out
        </Button>
      </Typography> */}
    </List>
  );
}

export default function MegaMenuDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 fixed top-[2px] left-[50%] translate-x-[-50%] z-[100]">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 font-protest"
        >
          <NavLink
            to="/"
            onClick={() => dispatch(setCategory({ category: "All" }))}
          >
            Shopify
          </NavLink>
        </Typography>
        <div className="flex gap-[10px]">
          <div className="hidden lg:block">
            <NavList />
          </div>
          <ProfileMenu />
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

/* eslint-disable react/prop-types */
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Badge,
} from "@material-tailwind/react";

import auth from "../utils/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function FilteringMenu({ arrOptions, header }) {
  const [selected, setSelected] = useState(arrOptions[0]);
  const navigate = useNavigate();
  useEffect(() => {
    const authAccess = auth();
    console.log(`access : `, authAccess);
    if (!authAccess) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <Menu>
      <MenuHandler>
        <Button>{selected}</Button>
      </MenuHandler>
      <MenuList>
        {arrOptions.map((ele, index) => (
          <Badge key={index} content={`${header}`}>
            <MenuItem onClick={() => setSelected(ele)}>{ele}</MenuItem>
          </Badge>
        ))}
        {/* <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem> */}
      </MenuList>
    </Menu>
  );
}

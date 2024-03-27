// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from '@mui/icons-material/Menu';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';

const ManuBarAdmin = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
        { text: "สินค้า", link: "/user/index" },
        { text: "ประวัติการซื้อ", link: "/user/history" },
      ].map((item, index) => (
          <ListItem key={item} disablePadding>
            <ListItemButton element={Link} to={item.link}>
              <ListItemIcon>
                {index == 0 && <ProductionQuantityLimitsIcon/>}
                {index == 1 && <ManageSearchSharpIcon/>}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <Button onClick={toggleDrawer(true)}><MenuIcon className ="text-gray-500"/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default ManuBarAdmin;

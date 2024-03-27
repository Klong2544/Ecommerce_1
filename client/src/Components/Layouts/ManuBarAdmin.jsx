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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CategoryIcon from '@mui/icons-material/Category';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const ManuBarAdmin = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
        { text: "จัดการผู้ใช้งาน", link: "/admin/manage" },
        { text: "เพิ่มหมวดหมู่", link: "/admin/create-category" },
        { text: "เพิ่มรายการสินค้า", link: "/admin/create-product" },
        { text: "จัดการสินค้า", link: "/admin-order" }
      ].map((item, index) => (
          <ListItem key={item} disablePadding>
            <ListItemButton element={Link} to={item.link}>
              <ListItemIcon>
                {index == 0 && <ManageAccountsIcon/>}
                {index == 1 && <CategoryIcon/>}
                {index == 2 && <AddBusinessIcon/>}
                {index == 3 && <Inventory2Icon/>}
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

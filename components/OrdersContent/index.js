import { Box, Typography, Divider, List } from "@mui/material";
import SwitchLabels from "../Switch";
import { useState, useMemo, useEffect } from "react";
import { TransitionGroup } from "react-transition-group";
import NotificationItem from "../NotificationItem";
import Collapse from "@mui/material/Collapse";
import { useOrders } from "../../context/orders-context";
import styles from "./OrdersContent.module.css";
import NoNewOrders from "../NoNewOrders";

export default function OrdersContent({orders}) {
  const [showUnRead, setShowUnRead] = useState(false);
  
  const handleSwitchChange = (e) => setShowUnRead(e.target.checked);

  const hasUnreadOrders = useMemo(
    

    () => {
      if (!Array.isArray(orders)) {
        return [];
      }
      else{
        orders.some((order) => !order.read)
      }
    },[orders]
  );

  const shouldShowNoNewOrders = showUnRead
    ? !hasUnreadOrders
    : orders.length === 0;

  const markAllAsRead = () => {
    const updateOrders = orders.map((order) => ({
      ...order,
      read: true,
    }));
    setOrders(updateOrders);
  };

  const handleUpdate = (id) => {
    const updateOrders = orders.map((order) =>
      order.id === id ? { ...order, read: !order.read } : order
    );
    setOrders(updateOrders);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Box className={styles.headerContent}>
          <Typography fontSize={24} fontWeight={500}>
            Orders
          </Typography>
          <SwitchLabels
            className="notifications-switch"
            size="small"
            label="Only show Unread"
            sx={{ mr: 0 }}
            onChange={handleSwitchChange}
          />
        </Box>
        <Collapse in={hasUnreadOrders}>
          <Typography
            className={styles.markAllNotifications}
            onClick={markAllAsRead}
            style={{ display: "inline-block" }}
          >
            Mark All as read
          </Typography>
        </Collapse>
        <Divider />
      </Box>
      <Box sx={{overflowY:"scroll"}}>
        <List className={styles.list}>
          <TransitionGroup>
            {Array.isArray(orders)?(orders.map((item, index, self) => (
                <Collapse key={item.id}>
                  <NotificationItem
                    item={item}
                    // handleUpdate={handleUpdate}
                    isLastItem={index === self.length - 1}
                  />
                </Collapse>))):"No Orders"
              }
          </TransitionGroup>
        </List>
        {shouldShowNoNewOrders && <NoNewOrders />}
      </Box>
    </Box>
  );
}

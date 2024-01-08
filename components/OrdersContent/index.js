import { Box, Typography, Divider, List } from "@mui/material";
import SwitchLabels from "../Switch";
import { useState, useMemo } from "react";
import { TransitionGroup } from "react-transition-group";
import NotificationItem from "../NotificationItem";
import Collapse from "@mui/material/Collapse";
import { useNotifications } from "../../context/notifications-context";
import styles from "./OrdersContent.module.css";
import NoNewOrders from "../NoNewOrders";

export default function OrdersContent() {
  const [showUnRead, setShowUnRead] = useState(true);
  const { notifications, setNotifications } = useNotifications();

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [notifications]);

  const handleSwitchChange = (e) => setShowUnRead(e.target.checked);

  const hasUnreadNotifications = useMemo(
    () => notifications.some((notif) => !notif.read),
    [notifications]
  );

  const shouldShowNoNewNotifications = showUnRead
    ? !hasUnreadNotifications
    : notifications.length === 0;

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  const handleUpdate = (id) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, read: !notif.read } : notif
    );
    setNotifications(updatedNotifications);
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
        <Collapse in={hasUnreadNotifications}>
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
      <Box>
        <List className={styles.list}>
          <TransitionGroup>
            {sortedNotifications
              .filter((notif) => (showUnRead ? !notif.read : true))
              .map((item, index, self) => (
                <Collapse key={item.id}>
                  <NotificationItem
                    item={item}
                    handleUpdate={handleUpdate}
                    isLastItem={index === self.length - 1}
                  />
                </Collapse>
              ))}
          </TransitionGroup>
        </List>
        {shouldShowNoNewNotifications && <NoNewOrders />}
      </Box>
    </Box>
  );
}

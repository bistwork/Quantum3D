import { Box, Typography, Divider, List } from "@mui/material";
import SwitchLabels from "../Switch";
import { useState, useMemo,useEffect } from "react";
import { TransitionGroup } from "react-transition-group";
import NotificationItem from "../NotificationItem";
import Collapse from "@mui/material/Collapse";
import NoNewNotifications from "../NoNewNotifications";
import styles from "./NotificationsContent.module.css";

export default function NotificationsContent({notifications}) {
  const [showUnRead, setShowUnRead] = useState(false);
  const handleSwitchChange = (e) => setShowUnRead(e.target.checked);

  const hasUnreadNotifications = useMemo(
    
    () => {
      if (!Array.isArray(notifications)) {
        return [];
      }
      else{
        notifications.some((notification) => !notification.read)
      }
    },[notifications]
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
            Notifications
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
      <Box sx={{overflowY:"scroll"}}>
        <List className={styles.list}>
          <TransitionGroup>
          {Array.isArray(notifications)?(notifications.map((item, index, self) => (
                <Collapse key={item.id}>
                  <NotificationItem
                    item={item}
                    // handleUpdate={handleUpdate}
                    isLastItem={index === self.length - 1}
                  />
                </Collapse>))):"No Notifications"
              }
          </TransitionGroup>
        </List>
        {shouldShowNoNewNotifications && <NoNewNotifications />}
      </Box>
    </Box>
  );
}

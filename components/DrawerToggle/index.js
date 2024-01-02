import React, { useState } from "react";
import styles from "./styles.module.css";

function DrawerToggle(props) {
  const [isOpen, setIsOpen] = useState(props.open);

  const handleClick = () => {
    if (isOpen) props.onClose();
    else props.onOpen();
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.icon} onClick={handleClick}>
      <div
        className={`${styles.barTop} ${!isOpen ? styles.topOpen : ""}`}
      ></div>
      <div
        className={`${styles.barMid} ${!isOpen ? styles.middleOpen : ""}`}
      ></div>
      <div
        className={`${styles.barBottom} ${!isOpen ? styles.bottomOpen : ""}`}
      ></div>
    </div>
  );
}

export default DrawerToggle;

import React from "react";

import { Menu } from "./Icons";
import styles from "./styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>Logo</span>
      <button className={styles.menuOpen}>
        <Menu />
        {/* Menu */}
      </button>
    </nav>
  );
}

export default Navbar;

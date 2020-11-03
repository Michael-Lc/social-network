import React from "react";

import { Menu, Logo } from "./Icons";
import styles from "./styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>
        <Logo /> <span>Connect</span>
      </span>
      <button className={styles.menuOpen}>
        <Menu />
        {/* Menu */}
      </button>
    </nav>
  );
}

export default Navbar;

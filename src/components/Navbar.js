import React from "react";
import { Link } from "react-router-dom";

import { Menu, Logo } from "./Icons";
import styles from "./styles/Navbar.module.css";

function Navbar() {
  const toggleMenu = () => {
    const menu = document.getElementById("navMenu");

    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  };

  window.onclick = (event) => {
    // console.log(event.target);
    const modal = document.getElementById("modal");

    if (event.target === modal) {
      modal.style.display = "none";
    }

    if (!event.target.matches(".Navbar_menuOpen__-nRHv")) {
      const menu = document.getElementById("navMenu");
      // console.log(menu.classList);

      if (menu.style.display === "block") {
        menu.style.display = "none";
      }
    }
  };

  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>
        <Link to="/">
          <Logo /> <span>Connect</span>
        </Link>
      </span>
      <button className={styles.menuOpen} onClick={toggleMenu}>
        <Menu />
      </button>

      <div className={styles.navMenu} id="navMenu" tabIndex="1">
        {true ? (
          <ul>
            <li>My Account</li>
            <li>Logout</li>
          </ul>
        ) : (
          <ul>
            <li>Login</li>
            <li>Sign Up</li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

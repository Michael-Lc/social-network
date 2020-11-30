import React from "react";
import { Link } from "react-router-dom";

import { Menu, Logo } from "./Icons";
import styles from "./styles/Navbar.module.css";

function Navbar() {
  const toggleMenu = () => {
    const menu = document.getElementById("navMenu");
    // console.log(menu.classList);

    for (const c of menu.classList) {
      if (c.includes("Navbar_show")) {
        menu.classList.remove(c);
        return;
      }
    }

    menu.classList.add(styles.show);
  };

  window.onclick = (event) => {
    // console.log(event.target);
    if (!event.target.matches(".Navbar_menuOpen__-nRHv")) {
      const menu = document.getElementById("navMenu");
      // console.log(menu.classList);

      for (const c of menu.classList) {
        if (c.includes("Navbar_show")) {
          menu.classList.remove(c);
          return;
        }
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

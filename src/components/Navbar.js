import React from "react";
import { Link } from "react-router-dom";

import { Menu, Logo } from "./Icons";
import styles from "./styles/Navbar.module.css";
import faker from "faker";

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
    const menu = document.getElementById("navMenu");

    if (modal !== null && event.target === modal) {
      modal.style.display = "none";
    }

    if (menu !== null && !event.target.matches("#menuOpen")) {
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
      <button className={styles.menuOpen} onClick={toggleMenu} id="menuOpen">
        <Menu />
      </button>

      <div className={styles.navMenu} id="navMenu" tabIndex="1">
        {false ? (
          <ul>
            <li className={styles.menuItem}>
              {" "}
              <Link to={{ pathname: `/user/${faker.finance.account(8)}` }}>
                My Account
              </Link>{" "}
            </li>
            <li className={styles.menuItem}>Logout</li>
          </ul>
        ) : (
          <ul>
            <li className={styles.menuItem}>
              {" "}
              <Link to={{ pathname: `/login` }}>Login</Link>{" "}
            </li>
            <li className={styles.menuItem}>
              {" "}
              <Link to={{ pathname: `/signup` }}>Sign Up</Link>{" "}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

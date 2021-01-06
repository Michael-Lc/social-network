import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";

import {
  Logo,
  MenuIcon,
  LoginIcon,
  SignUpIcon,
  UserIcon,
  LogoutIcon,
} from "./Icons";
import styles from "./styles/Navbar.module.css";

function Navbar(props) {
  const { user, logout } = props;

  const toggleMenu = () => {
    const menu = document.getElementById("navMenu");

    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  };

  window.onclick = (event) => {
    const modal = document.getElementById("modal");
    const menu = document.getElementById("navMenu");

    if (modal !== null && event.target === modal) {
      modal.style.display = "none";
    }

    if (menu !== null && !event.target.matches("#menuOpen")) {
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
        <MenuIcon />
      </button>

      <div className={styles.navMenu} id="navMenu" tabIndex="1">
        {user ? (
          <ul>
            <li className={styles.menuItem}>
              {" "}
              <Link to={{ pathname: `/user/${user.id}` }}>
                <UserIcon /> My Account
              </Link>{" "}
            </li>
            <li className={styles.menuItem}>
              <Link onClick={logout} to="">
                <LogoutIcon /> Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li className={styles.menuItem}>
              {" "}
              <Link to={{ pathname: `/login` }}>
                <LoginIcon /> Login{" "}
              </Link>{" "}
            </li>
            <li className={styles.menuItem}>
              {" "}
              <Link to={{ pathname: `/signup` }}>
                <SignUpIcon /> Sign Up{" "}
              </Link>{" "}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

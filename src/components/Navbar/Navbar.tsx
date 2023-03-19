import React from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { Image } from "antd";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to={"/"} className={styles.navbarLogo}>
        <Image
          preview={false}
          src="/images/logo.png"
          alt=""
          width={50}
          height={50}
        />
      </Link>
      <div className={styles.navbarCategory}>
        <p>Movies</p>
        <p>TV show</p>
        <p>People</p>
        <p>More</p>
      </div>
    </div>
  );
};

export default Navbar;

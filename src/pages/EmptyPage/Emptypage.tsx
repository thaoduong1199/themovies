import React from "react";
import styles from "./Emptypage.module.scss";
import { Link } from "react-router-dom";
import { Image } from "antd";

const EmptyPage = () => {
  return (
    <div className={styles.emptyPage}>
      <Image
        src="/images/404.png"
        alt="404 page"
        width={500}
        height={200}
        preview={false}
      />
      <div className={styles.textBelow}>
        OOPS! CLICK
        <Link to="/" className={styles.link}>
          HERE
        </Link>
        TO COMBACK HOMEPAGE
      </div>
    </div>
  );
};

export default EmptyPage;

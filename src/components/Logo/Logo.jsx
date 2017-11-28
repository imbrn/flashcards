import React from "react";
import classnames from "classnames";
import logoSmall from "../../images/logo-sm.svg";
import logoLarge from "../../images/logo-lg.svg";
import styles from "./Logo.m.css";

const Logo = () => {
  return (
    <span className={styles.logo}>
      <img src={logoSmall} alt="Flashcards" className='xl:hidden' />
      <img src={logoLarge} alt="Flashcards" className='hidden xl:inline-block' />
    </span>
  );
};

export default Logo;

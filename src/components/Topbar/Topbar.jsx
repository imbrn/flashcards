import React from "react";
import { Switch } from "react-router-dom";
import routes from "./routes";
import { objectToRoute } from "../utils";
import classnames from "classnames";
import logo from "../../images/logo.svg";
import githubImage from "../../images/github.svg";
import Container from "../Container";
import styles from "./Topbar.m.css";

const Topbar = () => {
  return (
    <div className={classnames(styles.topbar)}>
      <Container className={styles.content}>

        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={classnames(styles.title)}>
          <Switch>{routes.title.map(objectToRoute)}</Switch>
        </div>

        <div className={styles.actions}>
          <Switch>{routes.actions.map(objectToRoute)}</Switch>
        </div>

        <div className={styles.social}>
          <GitHubLink />
        </div>

        <div className={styles.auth}>
        </div>

      </Container>
    </div>
  );
};

const Logo = () => {
  return (
    <span className={styles.logo}>
      <img src={logo} alt="Flashcards" height="32" className={styles.logoImage}/>
      <span className={styles.logoText}>Flashcards</span>
    </span>
  );
};

const GitHubLink = () => {
  return (
    <a href={GITHUB} className={classnames(styles.socialLink)}>
      <span className={styles.socialLinkIcon}><img alt="" src={githubImage} height="20" /></span>
      <span className={styles.socialLinkText}>GitHub</span>
    </a>
  );
};

export default Topbar;

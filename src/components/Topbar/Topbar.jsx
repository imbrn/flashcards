import React from "react";
import { Switch } from "react-router-dom";
import classnames from "classnames";
import Logo from "../Logo";
import githubImage from "../../images/github.svg";
import styles from "./Topbar.m.css";
import { objectToRoute } from "../utils";
import routes from "./routes";

const Topbar = () => {
  return (
    <div className={classnames(styles.topbar, 'bg-white shadow')}>

      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={classnames(styles.title, 'text-secondary font-bold text-base')}>
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

    </div>
  );
};

const GitHubLink = () => {
  return (
    <a href={GITHUB} className={classnames(styles.githubLink, "font-medium text-xs no-underline text-black")}>
      <span className="icon mr-1"><img alt="" src={githubImage} height="20" /></span>
      <span className={styles.githubLinkText}>GitHub</span>
    </a>
  );
};

export default Topbar;

import React from 'react';
import styles from './Base.module.css';

const Base = ({ className, classes={}, title, actions, content, footer, ...rest }) => {

  const render = () => {
    return (
      <div className={`has-bg-white raised ${styles.deck} ${className}`} {...rest}>
        {renderHeader()}
        {renderContent()}
        {renderFooter()}
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <header className={`has-bg-primary gutters ${styles.header} ${classes.header}`}>
        <div className={`is-size-5 has-text-weight-bold ${styles.title}`}>{title}</div>
        <div className={styles.actions}>{actions}</div>
      </header>
    );
  };

  const renderContent = () => {
    return (
      <section className={`gutters ${styles.content}`}>
        {content}
      </section>
    );
  };

  const renderFooter = () => {
    if (footer) {
      return (
        <footer className={`gutters ${styles.footer}`}>
          {footer}
        </footer>
      );
    }
  };

  return render();

};

export default Base;

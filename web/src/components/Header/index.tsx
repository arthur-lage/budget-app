import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <Link className={styles.logo} to="/">
        Budget
      </Link>
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      <nav>
        <ul>
          <li>
            <Link className={styles.about} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={styles.login} to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className={styles.register} to="/register">
              Get Started
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

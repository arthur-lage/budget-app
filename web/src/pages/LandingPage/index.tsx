import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

import Illustration from "../../assets/landing-page-illustration.svg";
import { useState } from "react";

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
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

      <main>
        <h1 className={styles.title}>Budget</h1>
        <p className={styles.description}>
          Manage your personal finances easily.
        </p>
        <img
          className={styles.image}
          src={Illustration}
          alt="Man looking at a graph on a computer screen"
        />
        <Link to="/register" className={styles.getStarted}>
          Get Started
        </Link>
      </main>
    </div>
  );
}

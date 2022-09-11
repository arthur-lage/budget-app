import { useState } from "react";
import { Link } from "react-router-dom";

import SettingsIcon from "../../assets/settings-icon.svg";

import styles from "./styles.module.scss";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  isLight: boolean
}

export function Header({ isLight = false }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { currentUser, logout } = useAuth();

  async function handleSettings () {
    console.log("settings")
  }

  return (
    <header className={`${isLight ? styles.light : ""}`}>
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
          {currentUser && (
            <button className={styles.settingsButton} onClick={handleSettings}>
              <img src={SettingsIcon} alt="Settings icon" />
            </button>
          )}
          <li>
            <Link className={styles.about} to="/about">
              About
            </Link>
          </li>
          {currentUser ? (
            <li>
              <button onClick={logout} className={styles.logout}>
                Logout
              </button>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

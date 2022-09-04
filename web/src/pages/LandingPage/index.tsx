import { Link } from "react-router-dom";

import styles from './styles.module.scss'

import Illustration from '../../assets/landing-page-illustration.svg'

export function LandingPage() {
  return (
    <div className={styles.container}>
      <header>
        <Link className={styles.logo} to="/">Budget</Link>
        <nav>
          <ul>
            <li>
              <Link className={styles.about} to="/about">About</Link>
            </li>
            <li>
              <Link className={styles.login} to="/login">Login</Link>
            </li>
            <li>
              <Link className={styles.register} to="/register">Get Started</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <h1 className={styles.title}>Budget</h1>
        <p className={styles.description}>Manage your personal finances easily.</p>
        <img src={Illustration} alt="Man looking at a graph on a computer screen" />
        <button className={styles.getStarted}>Get Started</button>
      </main>
    </div>
  );
}

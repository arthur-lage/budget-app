import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

import Illustration from "../../assets/404.svg";
import { Header } from "../../components/Header";

export function NotFound() {
  return (
    <div className={styles.container}>
      <Header />
      
      <main>
        <img
          src={Illustration}
          alt="404 Page Not Found - Illustration"
          className={styles.image}
        />
        <h1 className={styles.title}>Not Found</h1>
        <p className={styles.description}>Sorry, we couldn't find this page!</p>
        <Link className={styles.link} to="/">
          Return to Home
        </Link>
      </main>
    </div>
  );
}

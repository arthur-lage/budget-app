import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

import Illustration from "../../assets/landing-page-illustration.svg";
import { useState } from "react";
import { Header } from "../../components/Header";

export function LandingPage() {
  return (
    <div className={styles.container}>
      <Header />

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

import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

import HTMLIcon from '../../assets/html5-original.svg'
import CSSIcon from '../../assets/css3-original.svg'
import JavaScriptIcon from '../../assets/javascript-original.svg'
import ReactIcon from '../../assets/react-original.svg'
import SassIcon from '../../assets/sass-original.svg'
import TypeScriptIcon from '../../assets/typescript-original.svg'
import NodeJSIcon from '../../assets/nodejs-original.svg'
import ExpressIcon from '../../assets/express-original.svg'
import PostgresqlIcon from '../../assets/postgresql-original.svg'
import PrismaIcon from '../../assets/prisma-original.svg'
import ExpoIcon from '../../assets/expo-original.svg'

export function About() {
  return (
    <div className={styles.container}>
      <Header />

      <main>
        <h1 className={styles.title}>About</h1>

        <p className={styles.madeBy}>
          This project was made by{" "}
          <a target={"_blank"} href="https://github.com/arthur-lage">
            Arthur Lage
          </a>
        </p>

        <p className={styles.projectLink}>
          You can check the project source code{" "}
          <a target={"_blank"} href="https://github.com/arthur-lage/budget-app">
            here
          </a>
        </p>

        <section className={styles.technologiesSection}>
          <h2 className={styles.technologiesTitle}>Technologies used:</h2>

          <div className={styles.technologyRowWrapper}>
            <h3 className={styles.technologyRowTitle}>Frontend</h3>
            <h3 className={styles.technologyRow}>
              <div className={styles.technology}>
                <img src={HTMLIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>HTML</p>
              </div>
              <div className={styles.technology}>
                <img src={CSSIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>CSS</p>
              </div>
              <div className={styles.technology}>
                <img src={JavaScriptIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>JavaScript</p>
              </div>
              <div className={styles.technology}>
                <img src={ReactIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>React</p>
              </div>
              <div className={styles.technology}>
                <img src={SassIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>Sass</p>
              </div>
              <div className={styles.technology}>
                <img src={TypeScriptIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>TypeScript</p>
              </div>
            </h3>
          </div>

          <div className={styles.technologyRowWrapper}>
            <h3 className={styles.technologyRowTitle}>Backend</h3>
            <div className={styles.technologyRow}>
              <div className={styles.technology}>
                <img src={NodeJSIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>NodeJS</p>
              </div>
              <div className={styles.technology}>
                <img src={ExpressIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>Express</p>
              </div>
              <div className={styles.technology}>
                <img src={PostgresqlIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>PostgreSQL</p>
              </div>
              <div className={styles.technology}>
                <img src={TypeScriptIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>TypeScript</p>
              </div>
              <div className={styles.technology}>
                <img src={PrismaIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>Prisma</p>
              </div>
            </div>
          </div>

          <div className={styles.technologyRowWrapper}>
            <h3 className={styles.technologyRowTitle}>Mobile</h3>

            <div className={styles.technologyRow}>
              <div className={styles.technology}>
                <img src={ReactIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>React Native</p>
              </div>
              <div className={styles.technology}>
                <img src={ExpoIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>Expo</p>
              </div>
              <div className={styles.technology}>
                <img src={TypeScriptIcon} className={styles.technologyImage} />
                <p className={styles.technologyName}>TypeScript</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>Made with 💜 by Arthur Lage</footer>
    </div>
  );
}

import Hero from "./components/hero";
import NavBar from "./components/navbar";
import Layout from "./layout";
import styles from "./style.module.css";

export default function Vanila() {
  return (
    <div className={styles.layout}>
      <Layout>
        <div className={styles.leftLine} />
        <div className={styles.rightLine} />
        <NavBar />
        <Hero />
      </Layout>
    </div>
  );
}

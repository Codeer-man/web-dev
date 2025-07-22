import styles from "../style.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Hero() {
  return (
    <div style={{ padding: "80px 0px" }}>
      <div className={styles.badge}>
        <span>What are Forms-1999 filing requirements?</span>
        <FaArrowRightLong className={styles.arrow} />
      </div>
      <h1 className={styles.heroTitle}>
        Magically simplify accounting and taxes
      </h1>
      <p className={styles.heroSubTitles}>
        Automated bookkeeping, effortless tax filing, real-time insight. Set up
        in 10 mins. Back to building
      </p>
      <div className={styles.heroBtn}>
        <button className={styles.btn}>Start Free Trial</button>
        <button className={styles.secondaryBtn}>
          {" "}
          <span>Pricing</span> <FaArrowRightLong className={styles.arrow} />{" "}
        </button>
      </div>
    </div>
  );
}

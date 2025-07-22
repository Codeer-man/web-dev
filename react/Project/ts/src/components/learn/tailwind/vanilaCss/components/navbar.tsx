import styles from "../style.module.css";

const Links = [
  {
    id: 1,
    title: "Guides",
    href: "#",
  },
  {
    id: 2,
    title: "pricing",
    href: "#",
  },
  {
    id: 3,
    title: "Login",
    href: "#",
  },
];

export default function NavBar() {
  return (
    <div className={styles.NavRoot}>
      <div className={styles.logo}>Firtech</div>
      <div className={styles.links}>
        {Links.map((link) => (
          <a className={styles.linksItem} href={link.href} key={link.id}>
            {link.title}
          </a>
        ))}
        <button className={styles.btn}>Start free trial</button>
      </div>
    </div>
  );
}

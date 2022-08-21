import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./HeaderNav.module.scss";

export const HeaderNav = () => {
  const isActive = (path: string) => {
    const current = useRouter().pathname;
    return path === current ? styles["headerNav__item--active"] : "";
  };

  return (
    <nav className={styles.headerNav}>
      <Link href="/">
        <a className={`${styles.headerNav__item} ${isActive("/")}`}>Home </a>
      </Link>
      <Link href="/about">
        <a className={`${styles.headerNav__item} ${isActive("/about")}`}>
          About
        </a>
      </Link>
      <Link href="/gallery">
        <a className={`${styles.headerNav__item} ${isActive("/gallery")}`}>
          Gallery{" "}
        </a>
      </Link>
      <Link href="/articles">
        <a className={`${styles.headerNav__item} ${isActive("/articles")}`}>
          Articles
        </a>
      </Link>
    </nav>
  );
};

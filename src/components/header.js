import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "../styles/header.module.css"

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Link to="/" className={styles.link}>
          {siteTitle}
        </Link>
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.navItem}>
            <Link to="/about" className={styles.link}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

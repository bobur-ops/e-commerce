import { APP_ROUTES } from '@config/routes'
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'

import Bag from '../../assets/img/svg/headerBag.svg'
import Logo from '../../assets/img/svg/headerLogo.svg'
import User from '../../assets/img/svg/headerUser.svg'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <div className={`${styles.header} container flex-between-center`}>
      <NavLink to={APP_ROUTES.PRODUCTS} className={styles.header__logo}>
        <img src={Logo} alt="logo" />
      </NavLink>
      <ul className={styles[`header-navbar`]}>
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive && styles.active}`}
        >
          <li className={classNames(styles['header-navbar__item'])}>Product</li>
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) => `${isActive && styles.active}`}
        >
          <li className={styles['header-navbar__item']}>Services</li>
        </NavLink>
        <NavLink
          to="/article"
          className={({ isActive }) => `${isActive && styles.active}`}
        >
          <li className={styles['header-navbar__item']}>Article</li>
        </NavLink>
        <NavLink
          to="/aboutus"
          className={({ isActive }) => `${isActive && styles.active}`}
        >
          <li className={styles['header-navbar__item']}>About us</li>
        </NavLink>
      </ul>
      <div className={styles['header-profile']}>
        <img src={Bag} alt="bag" />
        <img src={User} alt="user" />
      </div>
    </div>
  )
}

export default Header

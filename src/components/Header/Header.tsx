import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Bag from '../../assets/img/svg/headerBag.svg'
import Logo from '../../assets/img/svg/headerLogo.svg'
import User from '../../assets/img/svg/headerUser.svg'
import styles from './header.module.scss'

const Header = () => {
  return (
    <div className={`${styles.header} container flex-between-center`}>
      <Link to="/" className={styles.header__logo}>
        <img src={Logo} alt="logo" />
      </Link>
      <ul className={styles[`header-navbar`]}>
        <li
          className={classNames(styles['header-navbar__item'], styles.active)}
        >
          Product
        </li>
        <li className={styles['header-navbar__item']}>Services</li>
        <li className={styles['header-navbar__item']}>Article</li>
        <li className={styles['header-navbar__item']}>About us</li>
      </ul>
      <div className={styles['header-profile']}>
        <img src={Bag} alt="bag" />
        <img src={User} alt="user" />
      </div>
    </div>
  )
}

export default Header

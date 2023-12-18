import { Link } from 'react-router-dom'
import style from './Nav.module.css'

export const Nav = () => {
  return (
      <nav className={style.wrapper}>
          <Link to='/' className={style.nav}>Home</Link>
          <Link to='/movies' className={style.nav}>Movies</Link>
          <Link to='/about' className={style.nav}>About</Link>
      </nav>
  )
}

import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/movies'>Movies</Link>
        <Link to='/about'>About</Link>
    </nav>
  )
}

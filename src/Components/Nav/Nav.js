import { Link } from 'react-router-dom';
function Nav() {
  return (
    <nav className="nav__bar">
      <Link className="nav__title" to="/">
        Petful FIFO
      </Link>
      <Link to="/adopt" className="nav__link">
        Adopt A Pet
      </Link>
    </nav>
  );
}

export default Nav;

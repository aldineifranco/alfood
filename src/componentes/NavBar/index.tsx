import { Button } from '@mui/material';
import estilos from './NavBar.module.scss';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (<nav className={estilos.Link}>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/restaurantes">Restaurantes</Link>
      </li>
    </ul>
    <div>
      <Button variant='outlined' sx={{ borderColor: '#f2745f', '&:hover': { borderColor: '#df6b56' } }}><Link to={'/admin/restaurantes/'} style={{ textDecoration: 'none', color: '#df6b56' }}>Admin</Link></Button>
    </div>
  </nav>)
}

export default NavBar
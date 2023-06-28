import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import { AdministracaoRestaurante } from './paginas/Administracao/Restaurante/AdministracaoRestaurante';
import { FormularioRestaurante } from './paginas/Administracao/Restaurante/formularioRestaurante';
import { PaginaBaseAdmin } from './paginas/Administracao/PaginaBaseAdmin';
import { AdministracaoPratos } from './paginas/Administracao/Pratos/AdministracaoPratos';
import { FormularioPrato } from './paginas/Administracao/Pratos/formularioPrato';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
 
      <Route path='/admin' element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurante />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />

      </Route>
    </Routes>
  );
}

export default App;

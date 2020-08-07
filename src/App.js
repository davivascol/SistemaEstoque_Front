import React, { useEffect, useState } from 'react';
import { apiUrl } from './Util';

import CadastroProduto from './Components/CadastroProduto/CadastroProduto';
import './App.css';

const App = () => {
  const [state, setState] = useState({
    authenticationJwt: null,
  });

  useEffect(() => {
    fetch(`${apiUrl}/token`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        setState((estado) => ({ ...estado, authenticationJwt: data.token }));
      })
      .catch((error) => console.log(error));
  }, []);

  const { authenticationJwt } = state;

  return (
    <div className="App">
      <div className="app-header">
        ESTOQUE
      </div>
      <CadastroProduto authenticationJwt={authenticationJwt} />
    </div>
  );
};

export default App;

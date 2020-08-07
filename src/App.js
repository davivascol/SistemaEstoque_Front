import React, { useEffect, useState } from 'react';
import Produtos from './Components/Produtos/Produtos';
import Produto from './Components/Produto/Produto';

import './App.css';

const App = () => {
  const [state, setState] = useState({
    authenticationJwt: null,
    idProdutoSelecionado: null,
    flagListagem: true,
  });

  const CarregaLista = () => {
    fetch('http://localhost:49166/api/token', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        setState((estado) => ({ ...estado, authenticationJwt: data.token }));
      })
      .catch(console.log('console'));
  };

  useEffect(() => {
    CarregaLista();
  }, []);

  const handleInserir = () => setState({ ...state, flagListagem: false });
  const handleEditar = (idProdutoSelecionado) => setState({ ...state, idProdutoSelecionado, flagListagem: false });
  const handleVoltar = () => setState({ ...state, idProdutoSelecionado: null, flagListagem: true });

  return (
    <div className="App">
      <div className="app-header">
        ESTOQUE
      </div>
      <div className="app-page">
        {state.flagListagem
        && (
          <div className="app-page-header">
            <h1>Produtos</h1>
            <button className="botao-inserir" type="button" onClick={handleInserir}>+ Inserir Novo Produto</button>
          </div>
        )}
        {state.authenticationJwt
        && state.flagListagem
        && <Produtos authorization={state.authenticationJwt} clickEdicao={handleEditar} CarregaLista={CarregaLista} />}
        {!state.flagListagem
        && <Produto idProdutoSelecionado={state.idProdutoSelecionado} authorization={state.authenticationJwt} clickVoltar={handleVoltar} />}

      </div>
    </div>
  );
};

export default App;

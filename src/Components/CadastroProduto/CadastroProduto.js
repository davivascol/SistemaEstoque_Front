import React, { useState } from 'react';
import Produtos from '../Produtos/Produtos';
import Produto from '../Produto/Produto';

import './CadastroProduto.css';

const CadastroProduto = ({ authenticationJwt }) => {
  const [state, setState] = useState({
    idProdutoSelecionado: null,
    flagListagem: true,
  });

  const handleInserir = () => setState({ ...state, flagListagem: false });
  const handleEditar = (idProdutoSelecionado) => setState({ ...state, idProdutoSelecionado, flagListagem: false });
  const handleVoltar = () => setState({ ...state, idProdutoSelecionado: null, flagListagem: true });

  const { idProdutoSelecionado, flagListagem } = state;

  return (
    <div className="cadastro-wrapper">
      <div className="cadastro-page">
        {flagListagem
        && (
          <div className="cadastro-page-header">
            <h1>Produtos</h1>
            <button className="botao-inserir" type="button" onClick={handleInserir}>+ Inserir Novo Produto</button>
          </div>
        )}
        {authenticationJwt
        && flagListagem
        && <Produtos authorization={authenticationJwt} clickEdicao={handleEditar} />}
        {!flagListagem
        && <Produto idProdutoSelecionado={idProdutoSelecionado} authorization={authenticationJwt} clickVoltar={handleVoltar} />}
      </div>
    </div>
  );
};

export default CadastroProduto;

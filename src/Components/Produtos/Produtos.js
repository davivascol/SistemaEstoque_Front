import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Produtos.css';

import { apiUrl } from '../../Util';

const Produtos = ({ authorization, clickEdicao }) => {
  const [state, setState] = useState({
    produtos: null,
    erro: false,
  });

  const carregaLista = useCallback(() => {
    fetch(`${apiUrl}/Produto/`, { headers: { authorization: `Bearer ${authorization}` } })
      .then((res) => res.json())
      .then((data) => {
        setState((estado) => ({ ...estado, produtos: data }));
      })
      .catch(() => {
        setState((estado) => ({ ...estado, produtos: null, erro: true }));
      });
  }, [authorization]);

  useEffect(() => {
    carregaLista();
  }, [carregaLista]);

  const { produtos } = state;

  const handleDeletar = (idSelecionado) => {
    fetch(`${apiUrl}/Produto/${idSelecionado}`, { method: 'DELETE', headers: { authorization: `Bearer ${authorization}` } })
      .then(() => carregaLista());
  };

  return (
    <div className="produtos-wrapper">
      <table className="produtos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {
            produtos && produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.valor && produto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td><button className="botao-editar" type="button" onClick={() => clickEdicao(produto.id)}><FontAwesomeIcon icon={faEdit} />Editar</button></td>
                <td><button className="botao-excluir" type="button" onClick={() => handleDeletar(produto.id)}><FontAwesomeIcon icon={faTrash} />Excluir</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {produtos && produtos.length === 0 && <div className="mensagem-aviso">Estoque Vazio. Insira Novos Produtos</div>}
      {state.erro && <div className="mensagem-erro">Ocorreu um erro! Tente Novamente!</div>}
    </div>
  );
};

export default Produtos;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './Produto.css';

const Produto = ({ idProdutoSelecionado, authorization, clickVoltar }) => {
  const [state, setState] = useState({
    flagSalvo: false,
    erro: false,
  });
  const [idProduto, setIdProduto] = useState(null);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (idProdutoSelecionado) {
      fetch(`http://localhost:49166/api/Produto/${idProdutoSelecionado}`, { headers: { authorization: `Bearer ${authorization}` } })
        .then((res) => res.json())
        .then((data) => {
          setIdProduto(data.id);
          setNome(data.nome);
          setValor(data.valor);
          setQuantidade(data.quantidade);
        })
        .catch(() => {
          setState((estado) => ({ ...estado, flagSalvo: false, erro: true }));
        });
    }
  }, []);
  const handleSalvar = () => {
    let url = 'http://localhost:49166/api/Produto/';
    let method = 'POST';
    const produtoRequest = { nome, quantidade, valor };
    let body = { ...produtoRequest };
    if (idProduto) {
      url = `http://localhost:49166/api/Produto/${idProduto}`;
      method = 'PUT';
      body = { ...produtoRequest, id: idProduto };
    }
    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authorization}`,
      },
      body: JSON.stringify(body),
    };

    fetch(url, requestOptions)
      .then((res) => {
        if (res.status === 200 || res.status === 201) setState({ ...state, flagSalvo: true, erro: false });
        else setState((estado) => ({ ...estado, flagSalvo: false, erro: true }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="produto-wrapper">
      <div className="produto-header">
        <h1>{idProdutoSelecionado ? 'Editar Produto' : 'Novo Produto'}</h1>
        <button className="botao-voltar" type="button" onClick={() => clickVoltar()}><FontAwesomeIcon icon={faArrowLeft} />Voltar</button>
      </div>
      {idProduto && <div className="produto-id">ID: {idProduto}</div>}
      <div className="produto-inputs">
        <div className="produto-input">
          <div className="produto-input-label">
            Nome
          </div>
          <input type="text" onChange={(e) => setNome(e.target.value)} value={nome} />
        </div>
        <div className="produto-input">
          <div className="produto-input-label">
            Quantidade
          </div>
          <input type="number" min="0" onChange={(e) => setQuantidade(+e.target.value)} value={quantidade} />
        </div>
        <div className="produto-input">
          <div className="produto-input-label">
            Valor
          </div>
          <input type="number" min="0.00" step="0.01" onChange={(e) => setValor(+e.target.value)} value={valor} />
        </div>
      </div>
      {!state.flagSalvo && <button className="botao-salvar" type="button" onClick={() => handleSalvar()}>Salvar</button>}

      {state.flagSalvo && <div className="mensagem-salvo">Salvo com sucesso</div>}
      {state.erro && <div className="mensagem-erro">Dados incosistentes</div>}
    </div>
  );
};

export default Produto;

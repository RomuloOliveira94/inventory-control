import { useState } from "react";
import { useFetch } from "./hooks/useFetch";

import "./App.css";

const url = "http://localhost:3000/products";

function App() {
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };
    httpConfig(product, "POST");
    setName("");
    setPrice("");
  };

  const handleDelete = async (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <h1>Controle de Estoque</h1>
      <h2>Lista de Produtos</h2>
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
        <ul>
          {items &&
            items.map((prod) => (
              <li key={prod.id}>
                {prod.name} R$: {prod.price}
                <button key={prod.id} onClick={() => handleDelete(prod.id)}>
                  Deletar
                </button>
              </li>
            ))}
        </ul>
      )}
      <div className="add-products">
        <form onSubmit={handleSubmit}>
          <h2>Adicione um produto ao nosso estoque.</h2>
          <label>
            Produto:
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </label>
          {loading && (
            <button type="submit" disabled>
              Aguarde
            </button>
          )}
          {!loading && <button type="submit">Adicionar</button>}
        </form>
      </div>
    </div>
  );
}

export default App;

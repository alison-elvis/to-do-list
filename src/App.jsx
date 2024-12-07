import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [tarefas, setTarefas] = useState(() => {
    const storedTarefas = localStorage.getItem("tarefas");
    return storedTarefas ? JSON.parse(storedTarefas) : [];
  });
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);
  const adicionaTarefa = (e) => {
    e.preventDefault();
    setTarefas([...tarefas, inputValue]);
    setInputValue("");
  };
  const removeTarefa = (indice) => {
    setTarefas(tarefas.filter((tarefa, i) => i !== indice));
  };
  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={adicionaTarefa}>
        <input
          type="text"
          placeholder="Adiconar nova tarefa"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul className="list">
        {tarefas.map((tarefa, indice) => (
          <li
            key={indice}
            className="list-item"
            onClick={() => removeTarefa(indice)}
          >
            {tarefa}
          </li>
        ))}
      </ul>
    </div>  
  );
}
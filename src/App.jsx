import { useState } from "react";
import ItemLista from "./ItemLista";

function App() {
  // Atende aos itens 3 e 7: Lista em estado com os 3 itens iniciais e propriedade comprado
  const [itens, setItens] = useState([
    { id: 1, texto: "Arroz", comprado: false },
    { id: 2, texto: "Feijão", comprado: false },
    { id: 3, texto: "Leite", comprado: false },
  ]);

  const [novoItem, setNovoItem] = useState("");

  // Atende ao item 4: Adicionar item e esvaziar o campo
  function adicionarItem() {
    if (!novoItem.trim()) return;
    setItens((atual) => [
      ...atual,
      { id: Date.now(), texto: novoItem, comprado: false },
    ]);
    setNovoItem("");
  }

  // Atende ao item 5: Remover apenas o item clicado sem mutar o array direto
  function removerItem(id) {
    setItens((atual) => atual.filter((item) => item.id !== id));
  }

  // Atende ao item 7 (Bônus): Alternar o estado de comprado (riscado)
  function alternarComprado(id) {
    setItens((atual) =>
      atual.map((item) =>
        item.id === id ? { ...item, comprado: !item.comprado } : item
      )
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de compras</h1>

      {/* Input e Botão de Adicionar */}
      <div className="flex gap-2 mb-4">
        <input
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
          placeholder="Novo item"
          className="border border-gray-200 rounded-lg px-3 py-2 flex-1"
        />
        <button
          onClick={adicionarItem}
          className="bg-teal-700 text-white rounded-lg px-4 py-2"
        >
          Adicionar
        </button>
      </div>

      {/* Atende ao item 6: Mensagem de lista vazia */}
      {itens.length === 0 && (
        <p className="text-gray-500">Sua lista está vazia.</p>
      )}

      {/* Atende ao item 2, 3 e 7: .map, key única e passagem de props corretas */}
      {itens.map((item) => (
        <ItemLista
          key={item.id}
          texto={item.texto}
          comprado={item.comprado}
          onAlternar={() => alternarComprado(item.id)}
          onRemover={() => removerItem(item.id)}
        />
      ))}
    </div>
  );
}

export default App;

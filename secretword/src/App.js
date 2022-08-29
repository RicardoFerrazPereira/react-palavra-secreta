//CSS
import './App.css';
// React
import { useCallback, useEffect, useState } from "react";
// Dados
import { wordsList } from "./data/words";
// Componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

// estágios do jogo - usado pra fazer a progressão
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
]

function App() {
  // iniciar no estágio 1 ('start')
  const [gameStage, setGameStage] = useState(stages[0].name);
  // iniciar os dados
  const [words] = useState(wordsList);

  // Função para iniciar o jogo
  // mudar o stage do jogo
  const startGame = () => {
    setGameStage(stages[1].name);
  }

  // processar a letra que o usuário digita no input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  // função para reiniciar o jogo
  const retry = () => {
    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry} />}

    </div>
  );
}

export default App;

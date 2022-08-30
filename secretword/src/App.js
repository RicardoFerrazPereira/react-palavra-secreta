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

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  //letras advinhadas
  const [guessedLetters, setGuessedLetters] = useState([]);
  //letras erradas
  const [wrogLetters, setWrongLetters] = useState([]);
  //tentativas do usuário
  const [guesses, setGuesses] = useState(3);
  //pontuação
  const [score, setScore] = useState(0);

  // Função para escolher a palavra e a categoria
  const pickWordAndCategory = () => {
    // escolher a categoria aleatóriamente
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    // escolher a palavra aleatóriamente 
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);
    // retornar como um objeto - entre {}
    return { word, category };
  }

  // Função para iniciar o jogo
  // mudar o stage do jogo
  const startGame = () => {
    // escolher a palavra e a categoria aleatóriamente
    const { word, category } = pickWordAndCategory();
    // Criar um array de letras - transformar palavra em letras
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);
    // set states - preencher o estado
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }

  // processar a letra que o usuário digita no input
  const verifyLetter = (letter) => {
    console.log(letter)
  }

  // função para reiniciar o jogo
  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrogLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} />}

    </div>
  );
}

export default App;

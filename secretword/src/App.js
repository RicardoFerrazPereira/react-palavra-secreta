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
];

const guessesQty = 3;

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
  const [wrongLetters, setWrongLetters] = useState([]);
  //tentativas do usuário
  const [guesses, setGuesses] = useState(guessesQty);
  //pontuação
  const [score, setScore] = useState(0);

  // Função para escolher a palavra e a categoria
  const pickWordAndCategory = useCallback(() => {
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
  }, [words]);

  // Função para iniciar o jogo
  // mudar o stage do jogo
  const startGame = useCallback(() => {
    // limpar todas as letra
    clearLetterStates();
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
  }, [pickWordAndCategory]);

  // processar a letra que o usuário digita no input
  const verifyLetter = (letter) => {
    // normalizar a letra como minúscula
    const normalizedLetter = letter.toLowerCase();
    // validação para saber se a letra já foi utilizada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    // incluir as letras que o usuário digita para as letras acertadas ou erradas
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ]);
    }
    else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ]);

      // diminuir as tentativas
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // verificar se as tentativas acabaram
  useEffect(() => {
    if (guesses <= 0) {
      // reset all states - resetar o jogo zerado
      clearLetterStates();
      setGameStage(stages[2].name);
    }

  }, [guesses]);

  //checar condição de vitória
  useEffect(() => {
    // array de letras unicas
    const uniqueLetters = [...new Set(letters)]
    // condição de vitória
    if (guessedLetters.length === uniqueLetters.length) {
      // adicionar pontuação (score)
      setScore((actualScore) => actualScore += 100)
      // reiniciar o jogo com nova palavra
      startGame();
    }

    console.log(uniqueLetters)
  }, [guessedLetters, letters, startGame]);


  // função para reiniciar o jogo
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
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
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}

    </div>
  );
}

export default App;

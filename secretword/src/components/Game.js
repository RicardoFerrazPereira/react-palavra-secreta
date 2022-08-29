import "./Game.css";

const Game = ({ verifyLetter }) => {
  return (
    <div>
      <h1>Jogo</h1>
      <button onClick={verifyLetter} >Finalizar jogo</button>
    </div>
  )
}

export default Game
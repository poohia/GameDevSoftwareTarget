// import objects from "./GameDevSoftware/gameObjects/index.json";
import { useGameProvider } from "../../gameProvider";
import { TranslationComponent } from "../../components";

const Home = () => {
  const { canContinue, startNewGame, startGame, switchLanguage } =
    useGameProvider();
  return (
    <div>
      <button onClick={() => startNewGame()}>
        <TranslationComponent id="start_game" />
      </button>
      <button onClick={() => startGame()} disabled={!canContinue}>
        Continue
      </button>
      <br />
      <button onClick={() => switchLanguage("fr")}>Set french language</button>
      <button onClick={() => switchLanguage("en")}>Set english language</button>
    </div>
  );
};

export default Home;

import { useGameProvider } from "./gameProvider";
import { Scene, Home } from "./pages";

function App() {
  const { route } = useGameProvider();

  switch (route) {
    case "scene":
      return <Scene />;
    case "home":
    default:
      return <Home />;
  }
}

export default App;

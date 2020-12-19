import { Switch, Route } from "react-router-dom";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Pokedex} />
      <Route exact path="/:pokemonId" component={Pokemon} />
    </Switch>
  );
}

export default App;

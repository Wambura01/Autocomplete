import AutoComplete from "./components/autocomplete";

import "./App.css";

function App() {
  return (
    <div className="App">
      <AutoComplete
        options={[
          "Papaya",
          "Persimmon",
          "Paw Paw",
          "Prickly Pear",
          "Peach",
          "Pomegranate",
          "Pineapple",
        ]}
      />
    </div>
  );
}

export default App;

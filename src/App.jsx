import "./App.css";
import Search from "./components/Search";

function App() {
  return (
    <div
      style={{
        width: "80vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Search />
    </div>
  );
}

export default App;

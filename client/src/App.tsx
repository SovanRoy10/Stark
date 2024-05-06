import "./App.css";
import Layout from "./pages/layout/Layout";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>{/* Place your child components here */}</Layout>;
    </BrowserRouter>
  );
}

export default App;

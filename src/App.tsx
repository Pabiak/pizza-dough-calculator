import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="px-4 py-3">
      <Navbar />
      <Outlet />
    </main>
  );
}

export default App;

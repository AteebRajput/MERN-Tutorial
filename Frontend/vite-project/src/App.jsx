import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./pages/navbar/Navbar";
import { WorkoutContextProvider } from "./context/WorkoutContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <WorkoutContextProvider>
          <Navbar />
          <div className="main-body">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </WorkoutContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

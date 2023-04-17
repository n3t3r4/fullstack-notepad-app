import "./App.css";
import { AppBar } from "./components/AppBar";
import { Home } from "./routes/Home";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { NewNote } from "./routes/NewNote";
import { ViewNotePad } from "./routes/ViewNotePad";
import { EditNotePad } from "./routes/EditNotePad";

function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/new" element={<NewNote />} />

        <Route path="/notepad/:id" element={<ViewNotePad />} />

        <Route path="/edit/:id" element={<EditNotePad />} />
      </Routes>
      {/* <div className="absolute bottom-0 w-[100%]">
        <footer className="flex justify-center items-center py-2 text-sm bg-gray-300 shadow-2xl text-white">
          Projeto desenvolvido utilizando ReactJS
        </footer>
      </div> */}
    </BrowserRouter>
  );
}

export default App;

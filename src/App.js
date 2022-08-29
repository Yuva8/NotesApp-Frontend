import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import Notes from "./screens/Notes/Notes";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/CreateNote/SingleNote";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
function App() {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <BrowserRouter>
      <Header setSearch={(s) => setSearch(s)} />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/notes" element={<Notes search={search} />} />
          <Route path="/note/:id" element={<SingleNote />} />
          <Route path="/createnote" element={<CreateNote />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

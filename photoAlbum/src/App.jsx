import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./views/Home/Home"
import UploadPhoto from "./views/UploadPhoto/UploadPhoto"
import SinglePhoto from "./views/SinglePhoto/SinglePhoto"
import AllPhotos from "./views/AllPhotos/AllPhotos"
import NavBar from "./components/NavBar/NavBar"


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo-upload" element={<UploadPhoto />} />
          <Route path="/photos/:id" element={<SinglePhoto />} />
          <Route path="/photos" element={<AllPhotos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

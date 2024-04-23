import { BrowserRouter, Routes } from "react-router-dom"


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <h1 className="text-3xl font-bold underline">
            Hello world!
            <button className="btn btn-neutral">Neutral</button>
          </h1>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { useState } from 'react';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import AboutComics from './Components/AboutComics';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [search, setSearch] = useState({ titleParam: '', limitParam: 15 });

  const handleSearch = (params) => {
    setSearch(params);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      {/**
       * Body Part
       */}
      <Router>
        <Routes>
          <Route path="/" element={<Home searchParams={search} />} />
          <Route path="/comics/:id" element={<AboutComics />} />
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;

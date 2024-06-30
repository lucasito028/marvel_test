import { useEffect, useState } from 'react';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import AboutComics from './Components/AboutComics';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const savedSearch = () =>{
    const saved = JSON.parse(localStorage.getItem('searchParams'))
    return saved || {titleParam: '', limitParam: 15, dateParam: [null, null], characterParamId: null}
  }
  
  const [search, setSearch] = useState({ titleParam: '', limitParam: 15, 
    dateParam:  ['2024-01-01', '2024-06-28'] , characterParamId: null});

  const handleSearch = (params) => {
    setSearch(params);
  };
  useEffect(()=>{
    setSearch(savedSearch());
  }, [])

  return (
    <>
      {/**
       * Body Part
       */}
      <Router>
      <Header onSearch={handleSearch} />
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

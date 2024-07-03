import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import AboutComics from './Components/AboutComics';
import { Main } from './assets/app';

function App() {
  const [search, setSearch] = useState({
    titleParam: '',
    dateParam: [
      new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
      new Date().toISOString().split('T')[0]
    ],
    characterName: ''
  });

  const handleSearch = (params) => {
    setSearch(params);
  };

  const handleSelectCharacter = (characterId) => {
    setSearch({ ...search, characterName: characterId });
  };

  return (
    <Main>
      <Router>
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchParams={search} />} />
          <Route path="/comics/:id" element={<AboutComics />} />
        </Routes>
      </Router>
    </Main>
  );
}

export default App;

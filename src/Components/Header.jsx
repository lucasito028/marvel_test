import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderBackground, Container } from '../assets/header';
import { Api } from '../Services/Api';

export default function Header({ onSearch }) {
  const navigate = useNavigate();
  const [titleParam, setTitleParam] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [dateParam, setDateParam] = useState([
    new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    new Date().toISOString().split('T')[0]
  ]);
  const [characterList, setCharacterList] = useState([]);
  const [comicsList, setComicsList] = useState([]);
  const characterListRef = useRef(null); 
  const comicsListRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (characterListRef.current && !characterListRef.current.contains(event.target)) {
        setCharacterList([]); 
      }

      if (comicsListRef.current && !comicsListRef.current.contains(event.target)) {
        setComicsList([]); 
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (characterName) {
      const queryInstance = new Api(['characters'], {
        orderBy: 'name',
        nameStartsWith: characterName,
      });
      queryInstance.select().then(results => {
        setCharacterList(results.results);
      }).catch(error => {
        console.error('Error fetching characters:', error);
      });
    } else {
      setCharacterList([]);
    }
  }, [characterName]);

  useEffect(() => {
    if (titleParam) {
      const queryInstance = new Api(['series'], {
        titleStartsWith: titleParam,
        contains: "comic",
        orderBy: '-title',
      });
      queryInstance.select().then(results => {
        setComicsList(results.results);
      }).catch(error => {
        console.error('Error fetching comics:', error);
      });
    } else {
      setComicsList([]);
    }
  }, [titleParam]);

  const handleChangeTitle = (e) => {
    setTitleParam(e.target.value);
  };

  const handleChangeCharacter = (e) => {
    setCharacterName(e.target.value);
  };

  const handleChangeDate = (index, e) => {
    const newDateParam = [...dateParam];
    newDateParam[index] = e.target.value;
    setDateParam(newDateParam);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = { titleParam, dateParam, characterName };
    onSearch(searchParams);
    navigate('/');
  };

  return (
    <HeaderBackground>
      <Container>
        <div>
          <span aria-hidden="true">
            {/* SVG logo */}
          </span>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Search comics"
                value={titleParam}
                onChange={handleChangeTitle}
              />
              <button type="submit">Search</button>
            </div>
            <div>
              <div>
                <input
                  type="date"
                  placeholder="Date between"
                  value={dateParam[0] || ''}
                  onChange={(e) => handleChangeDate(0, e)}
                />
                <input
                  type="date"
                  placeholder="Date between"
                  value={dateParam[1] || ''}
                  onChange={(e) => handleChangeDate(1, e)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Character Name"
                  value={characterName}
                  onChange={handleChangeCharacter}
                />
              </div>
            </div>
          </form>
        </div>

        {characterList.length > 0 && (
          <div ref={characterListRef}>
            <h4>Characters:</h4>
            <ul>
              {characterList.map(character => (
                <li key={character.id} onClick={() => setCharacterName(character.name)}>
                  {character.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {comicsList.length > 0 && (
          <div ref={comicsListRef}>
            <h4>Series:</h4>
            <ul>
              {comicsList.map(comic => (
                <li key={comic.id} onClick={() => setTitleParam(comic.title.replace(/\s*\([^)]*\)/, ''))}>
                  {comic.title.replace(/\s*\([^)]*\)/, '')}
                </li>
              ))}
            </ul>
          </div>
        )}      
      </Container>
    </HeaderBackground>
  );
}

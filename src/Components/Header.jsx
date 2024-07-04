import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderBox, Container, TwoInput, DateInput, DivInput, ListOptions } from '../assets/header';
import { ServiceFilter } from '../Services/ServiceFilter';

export default function Header({ onSearch }) {
  
  const navigate = useNavigate();
  const [titleParam, setTitleParam] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [dateParam, setDateParam] = useState([
    new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    new Date().toISOString().split('T')[0]
  ]);

  const [characterList, setCharacterList] = useState([]);
  const characterListRef = useRef(null);
  const comicsListRef = useRef(null);
  const [showDateInputs, setShowDateInputs] = useState(false);
  const [showCharacterInput, setShowCharacterInput] = useState(false);

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

  const fetchCharacterNameResult = useCallback(async() => {
    if (characterName) {
      const queryInstance = new ServiceFilter(['characters'], {
        orderBy: 'name',
        nameStartsWith: characterName,
      });
      console.log(queryInstance);
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
      const searchParams = { titleParam, dateParam, characterName };
      onSearch(searchParams);
      navigate('/');
  }, [titleParam, characterName, dateParam]);

  useEffect(() => {
    fetchCharacterNameResult()
}, [characterName]);

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

  const handleToggleDateInputs = () => {
    setShowDateInputs(!showDateInputs);
    setShowCharacterInput(false); 
  };

  const handleToggleCharacterInput = () => {
    setShowCharacterInput(!showCharacterInput);
    setShowDateInputs(false); 
  };

  return (
    <HeaderBox>
      <Container>
        <div>
          <span aria-hidden="true">
            <svg width="130" height="52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect fill="#EC1D24" width="100%" height="100%"></rect>
              <path fill="#FEFEFE" d="M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z"></path>
              <path fill="#EC1D24" d="M0 0h30v52H0z"></path>
              <path fill="#FEFEFE" d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"></path>
            </svg>
          </span>
        </div>

        <div>
          <form>
            <DivInput>
              <input
                type="text"
                placeholder="Search comics"
                value={titleParam}
                onChange={handleChangeTitle}
              />

            </DivInput>

            <TwoInput>
              <button type="button" onClick={handleToggleDateInputs}>
                {showDateInputs ?  'Date Activate'  :  'Date' }
              </button>
              <button type="button" onClick={handleToggleCharacterInput}>
                {showCharacterInput ? 'Character Activate' : 'Character'}
              </button>
            </TwoInput>

            {showDateInputs && (
              <TwoInput>
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
              </TwoInput>
            )}

            {showCharacterInput && (
              <TwoInput>
                <div>
                  <input
                    type="text"
                    placeholder="Character Name"
                    value={characterName}
                    onChange={handleChangeCharacter}
                  />
                </div>
              </TwoInput>
            )}
          </form>
        </div>
      </Container>



      <Container>
      {characterList.length > 0 && (
          <ListOptions ref={characterListRef} className="visible">
            <h4>Characters:</h4>
            <ul>
              {characterList.map(character => (
                <li key={character.id} onClick={() => setCharacterName(character.name)}>
                  {character.name}
                </li>
              ))}
            </ul>
          </ListOptions>
        )}

        {/*
        comicsList.length > 0 && (
          <ListOptions ref={comicsListRef} className="visible">
            <h4>Series:</h4>
            <ul>
              {uniqueTitles.map(title => (
                <li key={title} onClick={() => setTitleParam(title)}>
                  {title}
                </li>
              ))}
            </ul>
          </ListOptions>
        )*/}
      </Container>
    </HeaderBox>
  );
}

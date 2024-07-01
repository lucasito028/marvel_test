import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Header({ onSearch }) {
  
  const navigate = new useNavigate()
  const [titleParam, setTitleParam] = useState('');
  //const [characterParamId, setCharacterParamId] = useState(0);
  //const [characterName, setCharacterName] = useState('');
  const [limitParam, setLimitParam] = useState(20);
  const [dateParam, setDateParam] = useState([new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0], 
      new Date().toISOString().split('T')[0]]);

  /*
  const getCharacterId = async () => {
    //console.log(characterName)
    const queryInstance = new Api(['characters'], {name: characterName, limit: 1});
    try {
      const results = await queryInstance.select();
      //console.log(results[0].id)
      setCharacterParamId(results[0].id);
    } catch (error) {
      console.log(error);
    }
  };
  */

  
  const handleChangeTitle = (e) => {
    setTitleParam(e.target.value);
  };
  const handleChangeLimit = (e) => {
    parseInt(setLimitParam(e.target.value));
  };
  /* const handleChangeCharacter = (e) => {
    setCharacterName(e.target.value);
  };*/
  const handleChangeDate = (index, e) => {
    const newDateParam = [...dateParam];
    newDateParam[index] = e.target.value;
    setDateParam(newDateParam);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //getCharacterId();
    //console.log(limitParam)
    //console.log(characterParamId)
    const searchParams = { titleParam, limitParam, dateParam }
    onSearch(searchParams);
    navigate("/")
  };

  return (
    <header>
      <h1>Comics Header</h1>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Search comics"
          value={titleParam}
          onChange={handleChangeTitle}
        />

        {/*
        <input
          type="text"
          placeholder="Search By Character"
          value={characterName}
          onChange={handleChangeCharacter}
        />*/}

        <input
          type="number"
          placeholder="Limit of Comics"
          value={limitParam}
          onChange={handleChangeLimit}
        />

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

        <button type="submit">Search</button>
      </form>
    </header>
  );
}

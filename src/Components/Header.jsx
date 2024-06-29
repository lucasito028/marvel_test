import { useState } from 'react';

export default function Header({ onSearch }) {
  
  const [titleParam, setTitleParam] = useState('');
  const [limitParam, setLimitParam] = useState(15);
  const [dateParam, setDateParam] = useState([]);

  const handleChangeTitle = (e) => {
    setTitleParam(e.target.value);
  };
  const handleChangeLimit = (e) => {
    setLimitParam(e.target.value);
  };
  const handleChangeDate = (e) => {
    setDateParam(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({titleParam, limitParam});
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
        <input
          type="number"
          placeholder="Limit of Comics"
          value={limitParam}
          onChange={handleChangeLimit}
        />

{/*
        <input
          type="date"
          placeholder="Date between"
          value={dateParam[0]}
          onChange={handleChangeDate}
        />
        <input
          type="date"
          placeholder="Date between"
          value={dateParam[1]}
          onChange={handleChangeDate}
        />
*/}
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

import { useState } from 'react';

export default function Header({ onSearch }) {
  const [titleParam, setTitleParam] = useState('');
  const [limitParam, setLimitParam] = useState(15);

  const handleChangeTitle = (e) => {
    setTitleParam(e.target.value);
  };
  const handleChangeLimit = (e) => {
    setLimitParam(e.target.value);
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
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

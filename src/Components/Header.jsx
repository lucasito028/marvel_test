import { useState } from 'react';
import { useNavigate} from "react-router-dom";

export default function Header({ onSearch }) {
  const [title, setTitle] = useState('');
  const [limit, setLimit] = useState(15);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeLimit = (e) => {
    setLimit(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({title, limit});
  };

  return (
    <header>
      <h1>Comics Header</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search comics"
          value={title}
          onChange={handleChangeTitle}
        />
        <input
          type="number"
          placeholder="Limit of Comics"
          value={limit}
          onChange={handleChangeLimit}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

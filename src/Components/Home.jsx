import { useEffect, useState } from "react";
import { Api } from "../Services/Api";
import { useNavigate } from "react-router-dom";

export default function Home({ searchParams }) {
  const navigate = useNavigate();
  const [comics, setComics] = useState([]);
  const {limit, title} = searchParams

  const fetchComics = async () => {
    const queryInstance = new Api('comics', { limit: limit, title: title });
    try {
      setComics(await queryInstance.select());
    } catch (error) {
      console.log(error);
    }
  };

  const toConvertData = (date) => {
    date = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  useEffect(() => {
    fetchComics();
  }, [limit, title]);

  const handleComic = (id) => {
    navigate(`/comics/${id}`);
  };

  return (
    <>

      <div>
        <p>{comics.length}</p>
        {comics.map((comic) => (
          <div key={comic.id} onClick={() => handleComic(comic.id)}>
            <ul>
              <li>{comic.id}</li>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <li>{comic.title}</li>
              <li>{comic.pageCount}</li>
              <li>{toConvertData(comic.dates[1].date)}</li>
            </ul>
            <br />
            <br />
          </div>
        ))}
      </div>
    </>
  );
}

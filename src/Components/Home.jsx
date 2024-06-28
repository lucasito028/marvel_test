import { useEffect, useState } from "react";
import { Query } from "../Services/Query";

export default function Home() {
  const [comics, setComics] = useState([]);

  const [id, setId] = useState(null);
  const [limit, setLimit] = useState(15);
  const [title, setTitle] = useState("");

  const fetchComics = async () => {
    const queryInstance = new Query({ id, limit, title });
    try {
      setComics(await queryInstance.select());
    } catch (error) {
      console.log(error);
    }
  };

  const toConvertData = (date) => {
    date = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = date.toLocaleDateString('pt-BR', options);
    return formatted;
  };

  const search = () => {
    setId(document.getElementById("id").value ? document.getElementById("id").value : null);
    setLimit(document.getElementById("limit").value ? document.getElementById("limit").value : 15);
    setTitle(document.getElementById("title").value ? document.getElementById("title").value : "");
  };

  useEffect(() => {
    fetchComics();
  }, [id, title, limit]);

  return (
    <>
      <div>
        <label>Pesquisar pelo Id</label>
        <input id="id" type="number" />
        <label>Pesquisar pelo Título</label>
        <input id="title" type="text" />
        <label>Limite se a pessoa quiser</label>
        <input id="limit" type="number" />

        <button onClick={() => search()}>Testar um ponto</button>
      </div>

      <div>
        <p>{comics.length}</p>
        {comics && comics.map((comic) => (
          <div key={comic.id}>
            <ul>
              <li>{comic.id}</li>
              <img src={comic.thumbnail.path+"."+comic.thumbnail.extension} />
              <li>{comic.title}</li>
              <li>{comic.pageCount}</li>
              <li>{toConvertData(comic.dates[1].date)}</li>
              <li>{comic.description}</li>
              <h2>Authors</h2>
              {comic.creators.items && comic.creators.items.map((item, index) => (
                <li key={`${comic.id}-creator-${index}`}>
                  {item.name} Function: {item.role}
                </li>
              ))}
            </ul>
            <br/>
            <br/>
          </div>
        ))}
        {/*
        <pre>{JSON.stringify(comics, null, 2)}</pre>
        */}
      </div>
    </>
  );
}

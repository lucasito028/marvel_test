import { useEffect, useState } from "react";
import { Api } from "../Services/Api";
import { useNavigate } from "react-router-dom";

export default function Home({ searchParams }) {
  const navigate = useNavigate();
  const [comics, setComics] = useState([]);
  const [total, setTotal] = useState(0);
  const [characterId, setCharacterId] = useState()
  const { limitParam, titleParam, dateParam, characterName } = searchParams;

  const getCharacterId = async () => {
    if(Boolean(characterName)){
      const queryInstance = new Api(['characters'], {name: characterName});
      try {
        const results = await queryInstance.select();
        setCharacterId(results.results[0].id)
        } catch (error) {
          console.log(error);
        }
    }
    else {
      setCharacterId(null)
    }
  };    

  const fetchComics = async () => {
    const queryInstance = new Api(['comics'], { 
      format: 'comic',
      formatType: "comic",
      noVariants: true,
      dateRange: dateParam,  
      titleStartsWith: titleParam || '', 
      characters: characterId || undefined,
      limit: parseInt(limitParam, 10) || 20,
    });

    console.log(queryInstance.titleParam)

    try {
      const results = await queryInstance.select();
      setTotal(results.total);
      setComics(results.results || []);
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
    console.log("3 - ")
    console.log(searchParams)
    getCharacterId();
    fetchComics();
  }, [characterName, dateParam, titleParam, 
    characterId, 
    limitParam]);

  const handleComic = (id) => {
    navigate(`/comics/${id}`);
  };

  return (
    <>
      <main>
        <div>
          {characterName && <> Nome do Herói selecionado: {characterName}<br></br></>}
          {characterId && <> Nome do Herói selecionado: {characterId}<br></br></>}
          {total && <>Total de Quadrinhos: {total}<br></br></>}
          {dateParam && <>Data Selecionada: {dateParam[0]} entre {dateParam[1]}<br></br></>}
          {titleParam && <>Título Selecionado: {titleParam}<br></br></>}
          {limitParam && <>Limite Selecionado: {limitParam}<br></br></>}
        </div>

        <div>
          {comics.map((comic) => (
            <div key={comic.id} onClick={() => handleComic(comic.id)}>
                <div>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    height="250px"
                    width="auto"
                  />
                </div>
                <div>
                  {comic.title}
                  {comic.pageCount} 
                </div>
                <div>{toConvertData(comic.dates[0].date)}</div>
              <br />
              <br />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

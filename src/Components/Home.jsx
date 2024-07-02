import { useEffect, useState } from "react";
import { Api } from "../Services/Api";
import { useNavigate } from "react-router-dom";
import { Main, Filter, ContainerCard, Card, ChieldCard } from "../assets/home";

export default function Home({ searchParams }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comics, setComics] = useState([]);
  const [total, setTotal] = useState(0);
  const [characterId, setCharacterId] = useState();
  const { limitParam, titleParam, dateParam, characterName } = searchParams;

  const getCharacterId = async () => {
    if (Boolean(characterName)) {
      const queryInstance = new Api(['characters'], { name: characterName });
      try {
        const results = await queryInstance.select();
        setCharacterId(results.results[0].id);
      } catch (error) {
        console.log(error);
      }
    } else {
      setCharacterId(null);
    }
  };

  const fetchComics = async () => {
    setIsLoading(true); 
    const queryInstance = new Api(['comics'], {
      format: 'comic',
      formatType: "comic",
      noVariants: true,
      dateRange: dateParam,
      titleStartsWith: titleParam || '',
      characters: characterId || undefined,
      limit: parseInt(limitParam, 10) || 20,
    });

    try {
      const results = await queryInstance.select();
      setTotal(results.total);
      setComics(results.results || []);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setError(`Error this is a: ${error}`)
      setIsLoading(false); 
    }
  };

  const toConvertData = (date) => {
    date = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    getCharacterId();
    fetchComics();
  }, [characterName, dateParam, titleParam, characterId, limitParam]);

  const handleComic = (id) => {
    navigate(`/comics/${id}`);
  };

  return (
      <Main>
        <Filter>
          {titleParam && <div>Selected Title: {titleParam}</div>}
          {characterName && <div>Selected Hero: {characterName}</div>}
          {/*characterId && <div>Selected Hero ID: {characterId}</div>*/}
          {dateParam && <div>Selected Date: {dateParam[0]} to {dateParam[1]}</div>}
          {limitParam && <div>Selected Limit: {limitParam}</div>}
          {total && <div>Total Selected Comics: {total}</div>}
        </Filter>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
        <ContainerCard>
          {comics.map((comic) => (
            <Card key={comic.id} onClick={() => handleComic(comic.id)}>
              <div>
                <p>{comic.id}</p>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  height="auto"
                  width="200px"
                />
              </div>
              <ChieldCard>
                {comic.title}
                {comic.pageCount}
              </ChieldCard>
              <div>{toConvertData(comic.dates[0].date)}</div>
              <br />
            </Card>
          ))}
        </ContainerCard>
        )}
      </Main>
  );
}

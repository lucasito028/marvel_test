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
  const { limitParam , titleParam, dateParam, characterName } = searchParams;

  const getCharacterId = async () => {
    if (Boolean(characterName)) {
      const queryInstance = new Api(['characters'], { 
        orderBy: 'name',
        nameStartsWith: characterName 
      });
      try {
        const results = await queryInstance.select();
        const id = results.results[0].id
        setCharacterId(id)
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
      format: "comic",
      formatType: "comic",
      noVariants: true,
      dateRange: dateParam,
      titleStartsWith: titleParam || '',
      characters: characterId,
      //orderBy: "onsaleDate",
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
            {titleParam && <div>Search Term: {titleParam}</div>}
            {characterName && <div>Search Hero: {characterName}</div>}
            {dateParam && <div>Selected Date: {dateParam[0]} to {dateParam[1]}</div>}
            {!isNaN(limitParam) && limitParam !== null && (
                <div>Limit: {limitParam}</div>
            )}
            {total !== 0 ? (
                <div>Total Comics by results: {total}</div>
            ) : (
                <div>No results found.</div>
            )}
        </Filter>

        {isLoading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>{error}</div>
        ) : comics && comics.length > 0 ? (
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
        ) : (
            <div>No comics found.</div>
        )}
    </Main>
);

}

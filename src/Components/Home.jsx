import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Main, Filter, ContainerCard, Card, ChieldCard, H2} from "../assets/home";
import { ServiceBody } from '../Services/ServiceHome';
import { ServiceFilter } from '../Services/ServiceFilter';

export default function Home({ searchParams }) {
  
  const navigate = useNavigate();
  const { titleParam, dateParam, characterName} = searchParams;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comics, setComics] = useState([]);
  const [total, setTotal] = useState(0);
  const [characterId, setCharacterId] = useState();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 

  const getCharacterId = useCallback(async () => {
    if (Boolean(characterName)) {
      const queryInstance = new ServiceFilter(['characters'], {
        orderBy: 'name',
        nameStartsWith: characterName,
      });
      try {
        const results = await queryInstance.select();
        const id = results.results[0].id;
        setCharacterId(id);
      } catch (error) {
        console.log(error);
      }
    } else {
      setCharacterId(null);
    }
  }, [characterName]);

  const fetchComics = useCallback(async (currentPage) => {
    
    setIsLoading(true);
    const limit = 20; 
    const queryInstance = new ServiceBody(['comics'], {
      format: "comic",
      formatType: "comic",
      noVariants: true,
      dateRange: dateParam,
      titleStartsWith: titleParam || '',
      characters: characterId,
      offset: (currentPage - 1) * limit,
      limit: limit
    });

    try {
      const results = await queryInstance.select();
      setTotal(results.total);
      if (currentPage === 1) {
        setComics(results.results);
      } else {
        setComics((prevComics) => [...prevComics, ...results.results]);
      }
      setHasMore(results.results.length > 0);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(`Error: ${error.message}`);
      setIsLoading(false);
    }
  }, [characterId, dateParam, titleParam]);

  const toConvertData = (date) => {
    date = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  //Use Effect Camp
  useEffect(() => {
    getCharacterId();
  }, [characterName, getCharacterId]);

  useEffect(() => {
    if (characterId !== undefined) {
      setPage(1); // Reiniciar a página
      setComics([]); // Limpar os quadrinhos
      fetchComics(1); // Buscar quadrinhos com a nova pesquisa
    }
  }, [characterId, dateParam, titleParam, fetchComics]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight; 
      const scrollTop = document.documentElement.scrollTop; 
      const clientHeight = document.documentElement.clientHeight; 

      if (scrollHeight - scrollTop <= clientHeight + 500 && !isLoading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchComics(page);
    }
  }, [page, fetchComics]);

  const handleComic = (id) => {
    navigate(`/comics/${id}`);
  };

  return (
    <Main>
      <Filter>
        {/*titleParam && <div>Term: {titleParam}</div>*/}
        {/*characterName && <div>Hero: {characterName}</div>*/}
        {/*dateParam && <div>Selected Date: {dateParam[0]} to {dateParam[1]}</div>*/}
        {total !== 0 ? (
          <div><H2>Total: {total}</H2></div>
        ) : (
          <div>No results found.</div>
        )}
      </Filter>

      {isLoading && page === 1 ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : comics && comics.length > 0 ? (
        <>
          <ContainerCard>
            {comics.map((comic, index) => (
              <Card key={`${comic.id}-${index}`} onClick={() => handleComic(comic.id)}>
                <div>
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
          {isLoading && page > 1 && <div>Loading more comics...</div>}
        </>
      ) : (
        <div>No comics found.</div>
      )}
    </Main>
  );
}

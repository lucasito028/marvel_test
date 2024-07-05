import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Main, 
  Filter, 
  ContainerCard, 
  Card, 
  ChieldCard, 
  BadDiv} from "../assets/home";
import {H2} from "../assets/aboutComics"
import {EmojiSad} from '@styled-icons/entypo/EmojiSad'
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
        nameStartsWith: characterName.trimEnd().toLowerCase(),
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
    const limit = 60; 

    const queryInstance = new ServiceBody(['comics'], {
      format: "comic",
      formatType: "comic",
      noVariants: true,
      dateRange: dateParam,
      titleStartsWith: titleParam.trimEnd().toLowerCase() || '',
      characters: characterId,
      offset: (currentPage - 1) * limit,
      limit: limit
    });

    try {
      const results = await queryInstance.select();
      setTotal(results.total);
        if (currentPage === 1) {
          setComics(results.results);
          console.log(queryInstance)
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


  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight; 
      const scrollTop = document.documentElement.scrollTop; 
      const clientHeight = document.documentElement.clientHeight; 

      if (scrollHeight - scrollTop <= clientHeight + 500 && !isLoading && hasMore) {
        setPage((actualPage) => actualPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  useEffect(() => {
    getCharacterId();
  }, [characterName, getCharacterId]);

  useEffect(() => {
    if (page > 1) {
      fetchComics(page);
    }
  }, [page, fetchComics]);

  useEffect(() => {
    if (characterId !== undefined) {
      setPage(1); 
      setComics([]); 
      fetchComics(1); 
    }
  }, [characterId, dateParam, titleParam, fetchComics]);

  const handleComic = (id) => {
    navigate(`/comics/${id}`);
  };

  return (
    <Main>
      <Filter>
        {total !== 0 ? (
          <div><H2>Total: {total}</H2></div>
        ) : (
          <div>Total Nothing.</div>
        )}
      </Filter>

      {isLoading && 
      page === 1 ? 
        (<ContainerCard>
          <BadDiv>
            Loading....
          </BadDiv>
       </ContainerCard>) : 
      error ? 
        ( <div>{error}<EmojiSad /></div> ) : 
      comics && comics.length > 0 ? (
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
        <ContainerCard>
            <BadDiv>
              No comics found.
            </BadDiv>
            <BadDiv>
              <EmojiSad size="48"/>
            </BadDiv>
         </ContainerCard>)}
    </Main>
  );
}

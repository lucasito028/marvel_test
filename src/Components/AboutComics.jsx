import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../Services/Api";

export default function AboutComics() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [comic, setComic] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();

  const fetchComic = async () => {
    setIsLoading(true); 
    const queryInstance = new Api(['comics'], { id });
    try {
      const data = await queryInstance.select();
      if (data.results.length > 0) {
        setComic(data.results[0]);
        setErrorMessage(null);
        setIsLoading(false); 
      } else {
        setComic(null);
        setErrorMessage("Comic does not exist");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setComic(null);
      setErrorMessage("Error fetching comic");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const toConvertData = (date) => {
    date = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const backToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchComic();
  }, [id]);

  return (
    <main>
      <div>
        <button onClick={backToHome}>
          Back
        </button>
      </div>
      {isLoading ? (
          <div>Loading...</div>
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : ( comic && (
        <div key={comic.id}>
          <div>
            <img 
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
              height="500px"
              width="auto"
            />
          </div>  
          <div>
            <div>{comic.title}</div>
            <div>
              <div>
                Published on: {toConvertData(comic.dates[1].date)}<br></br>
                Number of Pages: {comic.pageCount}
              </div>
              <div>
                <div>
                  <p>Authors</p>
                  {comic.creators.items && comic.creators.items.map((item, index) => (
                    <li key={`${comic.id}-creator-${index}`}>
                      {item.role}: {item.name} 
                    </li>
                  ))}
                </div>
                <div>
                  {comic.characters.items && comic.characters.items.length > 0 && (
                    <>
                      <p>Characters</p>
                      {comic.characters.items.map((item, index) => (
                        <li key={`${comic.id}-character-${index}`}>
                          {item.name}
                        </li>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              {comic.description}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

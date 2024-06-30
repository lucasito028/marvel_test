import { useEffect, useState } from "react";
import { Api } from "../Services/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function AboutComics() {
  
  const navigate = new useNavigate()
  const [comic, setComic] = useState(null);
  const [errorMessage, setErrorMessage] = useState()
  const {id} = useParams(); 

  const fetchComic = async () => {
    if(!id) return;
    const queryInstance = new Api(['comics'], {id});
    try {
      const data = await queryInstance.select();
      if(data.length > 0){
        setComic(data[0])
        setErrorMessage("")
      }else{
        setComic(null)
        setErrorMessage("Comic Não existe")
        setTimeout(() => {
          navigate("/")
        }, 4000)
      }
    } catch (error) {
      console.log(error);
      setComic(null)
      setErrorMessage("Erro ao Buscar a Comic")
      setTimeout(() => {
        navigate("/")
      }, 4000)
    }
  };

  const toConvertData = (date) => {
    date = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = date.toLocaleDateString('pt-BR', options);
    return formatted;
  };

  const backToHome = () => {
    navigate("/")
  }

  useEffect(() => {
    fetchComic();
  }, [id]);

  return (
    <>
        <button onClick={() => backToHome()}>Voltar para Pagina Principal</button>
        {errorMessage && <div>{errorMessage}</div>}
        {comic && (
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

              {comic.characters.items && comic.characters.items.length > 0 && (
              <>
                <h2>Herois</h2>
                {comic.characters.items.map((item, index) => (
                  <li key={`${comic.id}-character-${index}`}>
                    {item.name}
                  </li>
                ))}
              </>
            )}
            </ul>
            <br/>
            <br/>
          </div>
        )}

        {/*<pre>{JSON.stringify(comic, null, 2)}</pre>*/}
        
    </>
  );
}
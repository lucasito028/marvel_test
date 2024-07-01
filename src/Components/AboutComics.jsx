import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../Services/Api";

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
      if(data.results.length > 0){
        setComic(data.results[0])
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
    <main>
      <div>
        <button onClick={() => backToHome()}>
          Voltar para Pagina Principal
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
        {comic && (
          <div key={comic.id}>
              <div>
                <img 
                  src={comic.thumbnail.path+"."+comic.thumbnail.extension} 
                  height= "500px"
                  width= "auto"
                  />
              </div>  
              <div>
                <div> {comic.title}{/*comic.id*/}</div>
                <div>
                  <div>
                    Publicado em: {toConvertData(comic.dates[1].date)}<br></br>
                    Quantidade de Paginas {comic.pageCount}
                  </div>
                  <div>
                    <div>
                      <p>Autores</p>
                      {comic.creators.items && comic.creators.items.map((item, index) => (
                        <li key={`${comic.id}-creator-${index}`}>
                          {item.role}: {item.name} 
                        </li>
                      ))}
                    </div>
                    <div>
                      {comic.characters.items && comic.characters.items.length > 0 && (
                        <>
                          <p>Herois</p>
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
        )}
      {/*<pre>{JSON.stringify(comic, null, 2)}</pre>*/}     
  </main>
  );
}
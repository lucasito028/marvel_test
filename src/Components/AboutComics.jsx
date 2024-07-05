import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceBody } from '../Services/ServiceHome';

import {
  Main,
  HeaderMain,
  BodyMain,
  AboutComic,
  ImgComic,
  ContainerInformation,
  AlignInformation,
  H2,
  H3,
  H4,
  BasicFont,
  Button
} from "./../assets/aboutComics";

export default function AboutComics() {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [comic, setComic] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    
    const fetchComic = async () => {

      setIsLoading(true);
      const queryInstance = new ServiceBody(["comics"], { id });

      try {
        const data = await queryInstance.select();
        if (data.results.length > 0) {
          setComic(data.results[0]);
          setErrorMessage(null);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchComic();
  }, [id, navigate]);

  const toConvertData = (date) => {
    date = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const backToHome = () => {
    navigate("/");
  };

  return (
    <Main>
      <HeaderMain>
        <Button onClick={backToHome}>Back</Button>
      </HeaderMain>
      {
      isLoading ? (<BodyMain>Loading...</BodyMain>) 
      : errorMessage ? (<BodyMain>{errorMessage}</BodyMain>) 
      : comic ? (
        <BodyMain key={comic.id}>
          <ImgComic>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
          </ImgComic>
          <AboutComic>
            <ContainerInformation>
              <H2>{comic.title}</H2>
            </ContainerInformation>
            <ContainerInformation>
              <AlignInformation>
                <H3>Published In<br />{toConvertData(comic.dates[0].date)}</H3>
                <H4>Contributors</H4>
                {comic.creators.items &&
                  comic.creators.items.map((item, index) => (
                    <BasicFont key={`${comic.id}-creator-${index}`}>
                      {item.role.trim()}: {item.name}
                    </BasicFont>
                  ))}
              </AlignInformation>
              <AlignInformation>
                <H3>Saga Since<br />{comic.series.name}</H3>
                {comic.characters.items && comic.characters.items.length > 0 && (
                  <>
                    <H4>Characters</H4>
                    {comic.characters.items.map((item, index) => (
                      <BasicFont key={`${comic.id}-character-${index}`}>
                        {item.name.trim()}
                      </BasicFont>
                    ))}
                  </>
                )}
              </AlignInformation>
            </ContainerInformation>
            <ContainerInformation>
              <BasicFont>{comic.description}</BasicFont>
            </ContainerInformation>
          </AboutComic>
        </BodyMain>
      ) : null}
      {/*<pre>{JSON.stringify(comic, undefined, 2)}</pre>*/}
    </Main>
  );
}
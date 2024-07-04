import styled from "styled-components";

export const Main = styled.main`
  display: grid;
  place-items: center;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
  height: 90%
  padding: 15px;
`;

export const HeaderMain = styled.div`
  margin-bottom: 10px;
  width: 82%;
  color: #fff;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    width: 80%;
  }

  button {
      background-color: #151515;
      border: 1px solid rgba(255, 255, 255, 0.6); /* Borda mais fina e leve */
      padding: 7px;
      font-family: "Sen", sans-serif;
      font-size: 16px;
      color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
      transition: box-shadow 0.3s ease; /* Transição suave para o efeito de foco */
    }

  button:hover, input:focus {
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.8); /* Efeito de brilho ao focar ou passar o mouse */
`;
export const ImgComic = styled.div`
  place-items: center;
  justify-content: center;
  padding-top: 10px;
  height: 600px
  width: auto

  @media (max-width: 767px) {
    display: grid;
    place-items: center;

    img {
      width:340px;
      height:auto;
    }

  }
`;

export const BodyMain = styled.div`
  justify-content: center;
  display: flex;
  margin-bottom: 40px;

  @media (max-width: 767px) {
    display: block;
  }
`;
export const AboutComic = styled.div`
  flex-wrap: wrap;
  display: block;

  @media (max-width: 767px) {
    padding-top: 20px;
  }
`;

export const ContainerInformation = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  max-width: 700px;

  @media (max-width: 767px) {
    max-width: 400px;
    display: block;
    padding: 0;
    padding-right: 0px;
  }
`;
export const AlignInformation = styled.div`
  width: 100%;

  @media (max-width: 767px) {
    padding: 10px;
  }

  h3{
  padding-bottom: 20px;
  }
  
`;
export const Button = styled.button`
  background-color: rgb(32, 32, 32);
  color: white;
  padding: 15px;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
`;

export const H2 = styled.h2`
  margin: 0;
  text-transform: uppercase;

  &:hover {
    color: #e62429;
  }
  @media (max-width: 767px) {
    padding-left: 10px
  }
`;
export const H3 = styled.h3`
  margin: 0;
  text-transform: uppercase;

  &:hover {
    color: #e62429;
  }

`;
export const H4 = styled.h4`
  margin: 0;
  text-transform: uppercase;

  &:hover {
    color: #e62429;
  }

`;
export const H5 = styled.h5`
  margin: 0;
  text-transform: uppercase;

  &:hover {
    color: #e62429;
  }

`;
export const BasicFont = styled.p`
  text-transform: capitalize;

  &:hover {
    color: #727272;
  }
  @media (max-width: 767px) {
    padding-left: 10px
  }

`;
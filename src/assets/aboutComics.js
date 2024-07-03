import styled from "styled-components";

export const Main = styled.main`
  display: grid;
  place-items: center;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  height: 90%

`;

export const HeaderMain = styled.div`
border-top: 0.5px groove rgb(251, 251, 251);
width: 100%;
color: #fff;
padding-left: 100px;
`;

export const BodyMain = styled.div`
justify-content: center;
display: flex;
margin-bottom: 40px;

@media (max-width: 767px) {
  display: block;
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

export const ImgComic = styled.div`
  display: grid;
  place-items: center;

  @media (max-width: 767px) {
    img {
    width:340px;
    height:auto;}
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

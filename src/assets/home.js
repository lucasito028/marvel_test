import styled from "styled-components";

export const Main = styled.main `
  padding: 15px;
  padding-top: 0;
  display: block;
  justify-content: center;
  align-items: center;
`;
export const Filter = styled.div `
  display: grid;
  place-items: center; 
  padding-left: 0;

  div {
    margin: 10px;
  }
}
`;
export const ContainerCard = styled.div `
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const Card = styled.div `
  width: 200px;
  justify-content: center;
  align-items: center;
  margin: 5px;

  div {
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    color: #e62429;
  }

  &:hover img{
    transform: scale(1.01);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  }
  
  &:active  {
    transform: scale(1.05);
    box-shadow: 0 4px 2px rgba(0, 0, 0, 0.2);
    color: #e62429;
  }
`;
export const H2 = styled.h2 `
  font-weight: bold;
  font-size: 18px;
`;
export const ChieldCard = styled.div `
  margin: auto;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin 10px;
`;
export const BadDiv = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`;
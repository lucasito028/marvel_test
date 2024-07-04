import styled from "styled-components";

export const HeaderBox = styled.header`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center; 
`;
export const Container = styled.nav`
  padding-top: 12px;

  div{
    display: flex;
    justify-content: center;
    align-items: center; 
    padding-top: 6px;
  }

  input{
    font-weight: medium;
    height: 30px;
    min-width: 100px;
    font-family: "Sen", sans-serif;
    font-size: 16px;
    border: 1px solid rgba(255, 255, 255, 0.6); 
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    outline: none;
  }

  button {
    background-color: #151515;
    border: 1px solid rgba(255, 255, 255, 0.6); 
    padding: 7px;
    font-family: "Sen", sans-serif;
    font-size: 16px;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
    transition: box-shadow 0.3s ease; 
  }

  button:hover, input:focus {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8); 
}
`;

export const DivInput = styled.div`
  display: inline-block;
  width: 360px;

`;
export const TwoInput = styled.div`
  flex-direction: row;
  align-items: center;
  color: black;
  
  div {
  flex-direction: column;
  align-items: center;
  }

  input, button {
    margin: 5px;
  }

`;
export const DateInput = styled.div`
`;

export const ListOptions = styled.div`
  left: 0;
  width: 300px;
  height: 150px;
  background-color: #303030;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: none; /* Inicialmente oculto */
  overflow: scroll;

  &.visible {
    display: block; /* Mostra quando visível */
  }

  div{
    margin: 10px;
  }
  
  h4{
    padding-left: 7px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      padding: 10px;
      cursor: pointer;
      color: white;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

    }
  }
`;

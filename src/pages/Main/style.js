import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;
  margin: 80px auto;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.2);

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #ddd;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`;

const animate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: "submit",
  disabled: props.loading
}))`
  background: #0d2636;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;

  a{
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-tems: center;
    justify-content: left;
    text-decoration: none;
    color: black;
    transition: 1s;
  }

  a:hover{
    color: grey;
  }

  img{
    width: 76px;
    margin-right: 10px;
  }

  span{
    display: flex;
    flex-direction: column;
    justify-content: center
  }

    & + li{
      border-top: 1px solid;
    }
  }

`;
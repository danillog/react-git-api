import React, { useState, useCallback,useEffect } from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from "./style.js";
import { FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert , setAlert] = useState(null);

  //Buscar
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');

    if(repoStorage){
      setRepositorios(JSON.parse(repoStorage));
    }
  },[])

  //Salva
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios))
  },[repositorios]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(null)
        try {
          if(newRepo === ''){
            throw new Error('Vocẽ precisa indicar um repósitório')
          }

          const response = await api.get(`repos/${newRepo}`);
          
          const hasRepo = repositorios.find(repo => repo.name === newRepo);

          if(hasRepo){
            throw new Error ('Repositório duplicado')
          }
          const data = {
            name: response.data.full_name,
            avatar: response.data.owner.avatar_url,
            description: response.data.description
          };

          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          setAlert(true)
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      submit();
    },
    [newRepo, repositorios]
  );

  const handleDelete = useCallback(
    repo => {
      const find = repositorios.filter(r => r.name !== repo);
      setRepositorios(find);
    },
    [repositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={15} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map(repo => (
          <li key={repo.name}>
            <a href="">
              <img src={repo.avatar} />
            </a>
            <a href="">
              <span>
                <h3> {repo.name} </h3>
                <p> {repo.description} </p>
              </span>
            </a>
            <DeleteButton onClick={() => handleDelete(repo.name)}>
              <FaTrash size={14} />
            </DeleteButton>
          </li>
        ))}
      </List>
    </Container>
  );
}

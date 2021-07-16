import React, { useState } from "react";
import axios from "axios";
import * as S from "./styled";

import { useHistory } from "react-router-dom";

function App(props) {
  const history = useHistory();
  const [user, setUser] = useState("");

  const [erro, setErro] = useState(false);

  function handleSearch() {
    axios
      .get(`https://api.github.com/users/${user}/repos`)
      .then((response) => {
        const repositories = response.data;
        const repositoriesName = [];
        // eslint-disable-next-line array-callback-return
        repositories.map((repository) => {
          repositoriesName.push(repository.name);
        });
        localStorage.setItem(
          "repositoriesName",
          JSON.stringify(repositoriesName)
        );
        setErro(false);
        history.push("/repositories");
      })
      .catch((err) => {
        setErro(true);
      });
  }

  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input
          className="userInput"
          placeholder="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <S.Button type="button" onClick={handleSearch}>
          Search
        </S.Button>
      </S.Content>
      {erro ? (
        <S.ErrorMessage>USER NOT FOUND! Please, tray again! </S.ErrorMessage>
      ) : (
        ""
      )}
    </S.HomeContainer>
  );
}

export default App;

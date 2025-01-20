import { useState } from "react";
import { fetchToken } from "../utils/fetch";

interface GetTokenProps {
  token: string | null;
  setToken: (data: string) => void;
}

export default function GetToken({ token, setToken }: GetTokenProps) {
  const [error, setError] = useState<string | null>(null);

  const handleGetToken = () => {
    fetchToken()
      .then((result) => {
        localStorage.setItem("token", result);
        setToken(result);
      })
      .catch((rej) => {
        setError(rej.message);
      });
  };
  const handleDeleteToken = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  return (
    <>
      <button onClick={handleGetToken}>Войти</button>
      <button onClick={handleDeleteToken}>Выйти</button>
      {token ? <p>Вы авторизованы</p> : <p>Вы не авторизованы</p>}
      {error && <p>Произошла ошибка: {error}</p>}
    </>
  );
}

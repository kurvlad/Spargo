import { SetStateAction, useEffect, useState } from "react";
import "./App.css";
import { deletePost, fetchData } from "./utils/fetch";
import GetToken from "./components/GetToken";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [isCorrectURL, setIsCorrectURL] = useState(true);

  const handleSetToken = (e: SetStateAction<string | null>) => {
    setToken(e);
  };

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res);
        setError("");
        setIsAuth(true);
      })
      .catch((rej) => {
        setError(rej.message);
        if (rej.message == "401") {
          setIsAuth(false);
        }
        if (rej.message == "404") {
          setIsCorrectURL(false);
        }
      });
  }, [token, isUpdate == true]);
  useEffect(() => {
    setIsUpdate(false);
  }, [isUpdate]);

  const handleDeleteId = (id: string) => {
    deletePost(id).then(() => {
      setIsUpdate(true);
    });
  };
  return (
    <>
      <GetToken token={token} setToken={handleSetToken} />
      <Form setIsUpdate={setIsUpdate} />
      <List
        data={data}
        error={error}
        handleDeleteId={handleDeleteId}
        setIsUpdate={setIsUpdate}
        isAuth={isAuth}
        isCorrectURL={isCorrectURL}
      />
    </>
  );
}

export default App;

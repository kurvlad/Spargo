import { DataPost, DataPut } from "./Types";

export const fetchToken = () => {
  return fetch("http://195.133.39.82:8080/token")
    .then((response) => {
      if (!response.ok) {
        throw new Error("network error");
      }
      return response.json();
    })
    .catch((rej) => {
      throw new Error(rej.message);
    });
};

export const fetchData = () => {
  return fetch("http://195.133.39.82:8080/api/Nds", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .catch((rej) => {
      throw new Error(rej.message);
    });
};

export const createPost = (data: DataPost) => {
  return fetch("http://195.133.39.82:8080/api/Nds", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response;
    })
    .catch((rej) => {
      throw new Error(rej.message);
    });
};

export const deletePost = (id: string) => {
  return fetch(`http://195.133.39.82:8080/api/Nds/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response;
    })
    .catch((rej) => {
      throw new Error(rej.message);
    });
};

export const getInfoPost = (id: string) => {
  return fetch(`http://195.133.39.82:8080/api/Nds/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .catch((rej) => {
      throw new Error(rej.message);
    });
};

export const changePost = (id: string, data: DataPut) => {
  return fetch(`http://195.133.39.82:8080/api/Nds/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response;
    })
    .catch((rej) => {
      throw new Error(rej.message);
    });
};

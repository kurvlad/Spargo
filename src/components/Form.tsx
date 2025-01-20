import { useState } from "react";
import "./List.style.css";
import { createPost } from "../utils/fetch";
import { v4 as uuidv4 } from "uuid";

interface FormProps {
  setIsUpdate: (data: boolean) => void;
}

export default function Form({ setIsUpdate }: FormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const handlePost = () => {
    const data = {
      name: name,
      description: description,
      id: uuidv4(),
      value: Number(value),
      deletedAt: "2025-01-19T21:39:04.486",
    };
    console.log(data);
    createPost(data).then((res) => {
      if (res.ok) {
        setIsUpdate(true);
        setName("");
        setDescription("");
        setValue("");
        setDate("");
      }
    });
  };
  return (
    <>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
      />
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Количество"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Дата"
      />
      <button onClick={handlePost}>Добавить</button>
    </>
  );
}

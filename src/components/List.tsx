import { useState } from "react";
import Modal from "react-modal";
import "./List.style.css";
import { getInfoPost } from "../utils/fetch";
import ChangeForm from "./ChangeForm";

type DataItem = {
  id: string;
  name: string;
  description: string;
  value: number;
  deletedAt: string | null;
  createdAt: string | null;
  updatedAt: string;
};

interface ListProps {
  data: any[];
  error: string;
  handleDeleteId: (id: string) => void;
  setIsUpdate: (data: boolean) => void;
  isAuth: boolean;
  isCorrectURL: boolean;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const preventObj = {
  name: "",
  id: "",
  description: "",
  value: 0,
  updateAt: "",
  deleteAt: "",
};

export default function List({
  data,
  error,
  handleDeleteId,
  setIsUpdate,
  isAuth,
  isCorrectURL,
}: ListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(preventObj);

  const closeModal = () => {
    setIsOpen(false);
    setSelectItem(preventObj);
  };

  const getInfoId = (id: string) => {
    getInfoPost(id).then((res) => {
      setSelectItem(res);
    });
  };
  return (
    <>
      {error && !isAuth && (
        <p>Произошла ошибка, авторизуйтесь и попробуйте заново</p>
      )}
      {error && !isCorrectURL && <p>Произошла ошибка, Url неверный </p>}
      {data && !error && (
        <table>
          <thead>
            <tr>
              <td>Название</td>
              <td>Описание</td>
              <td>Количество</td>
              <td>Дата создания</td>
              <td>Дата изменения</td>
              <td>Дата окончания</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item: DataItem) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.value}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.updatedAt}</td>
                  <td>{item.deletedAt ? item.deletedAt : ""}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        getInfoId(item.id);
                      }}
                    >
                      Открыть информацию
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleDeleteId(item.id);
                      }}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {selectItem && (
          <div>
            <p>Название: {selectItem.name}</p>
            <p>Описание: {selectItem.description}</p>
            <p>id: {selectItem.id}</p>
            <ChangeForm
              // id={selectItem.id}
              selectItem={selectItem}
              setIsUpdate={setIsUpdate}
              closeModal={closeModal}
            />
          </div>
        )}
      </Modal>
    </>
  );
}

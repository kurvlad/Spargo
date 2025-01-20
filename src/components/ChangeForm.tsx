import { FormEvent } from "react";
import { changePost } from "../utils/fetch";
import { DataProp } from "../utils/Types";

interface FormData {
  name: string;
  description: string;
  value: number;
  deletedAt: string;
}

interface ChangeProps {
  selectItem: DataProp;
  setIsUpdate: (data: boolean) => void;
  closeModal: () => void;
}

export default function ChangeForm({
  selectItem,
  setIsUpdate,
  closeModal,
}: ChangeProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;

    const data: FormData = {
      name: target.names.value,
      description: target.description.value,
      value: Number(target.value.value),
      deletedAt: target.deletedAt.value,
    };
    changePost(selectItem.id, data).then(() => {
      setIsUpdate(true);
      closeModal();
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        defaultValue={selectItem.name}
        name="names"
        placeholder="Название"
      />
      <input
        defaultValue={selectItem.description}
        name="description"
        placeholder="Описание"
      />
      <input
        defaultValue={selectItem.value}
        type="number"
        name="value"
        placeholder="количество"
      />
      <input
        defaultValue={selectItem.deletedAt}
        type="date"
        name="deletedAt"
        placeholder="Дата удаления"
      />
      <button type="submit">Изменить</button>
    </form>
  );
}

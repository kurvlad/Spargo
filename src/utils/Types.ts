export interface DataPost {
  id: string;
  name: string;
  description: string;
  value: number;
  deletedAt: string;
}

export interface DataPut extends Omit<DataPost, "id"> {}
export interface DataProp extends DataPost {
  createdAt?: string;
  updatedAt?: string;
}

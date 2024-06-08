export interface IUser {
  _id: number;
  email: string;
  name: string;
  password: string;
  role: string;
}

export interface AddUser {
  _id: Object;
  email: string;
  name: string;
  password: string;
  role: string;
}

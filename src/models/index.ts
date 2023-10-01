// Genel olarak Kullanılan modelleri içerir

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
  image: string;
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodoModel {
  id: number;
  todo: string;
  userId: number;
  completed: boolean;
};
import { Role } from "./roles";

export type User = {
  userId: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

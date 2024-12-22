export interface User {
  id?: string;
  firstName?: string;
  lastName?:string;
  profilePic?: string;
  email?: string;
  telefone?:string;
  estado?:string
  cidade?:string

  [key: string]: unknown;
}

export interface UserFormData {
  id?: string;
  _id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  isAdmin: boolean;
  isActive: boolean;
}

export interface AuthFormData {
  username: string;
  password: string;
}

export interface SimplifiedMessagesProp {
  _id: string;
  username?: string;
  user: any;
  comment: string;
  reactions?: {
    liked: boolean;
  };
}

export interface KeywordsProps {
  _id: string;
  keywords: string;
}

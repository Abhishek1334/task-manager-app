import API from './axios';

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const registerUser = async (userData: RegisterUserData): Promise<{ message: string }> => {
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error('All fields are required for registration.');
  }

  const response = await API.post<{ message: string }>('/auth/register', userData);
  return response.data;
};


export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required.');
  }
  const response = await API.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

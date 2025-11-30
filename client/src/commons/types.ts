export interface IUserRegister {
  displayName: string;
  username: string;
  password: string;
}

export interface IUserRegister {
  displayName: string;
  username: string;
  password: string;
  cpf: string;
  telefone: string;
}

/*

// MUDANÇA: Interface para o formulário de Registro (inclui campo de validação local)
export interface IUserRegisterForm extends IUserRegister {
  confirmPassword?: string; 
}*/

export interface IResponse {
  status?: number;
  success?: boolean;
  message?: string;
  data?: object
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface Authorities {
  authority: string;
}

export interface AuthenticatedUser {
  displayName: string;
  username: string;
  authorities: Authorities[];
}

export interface AuthenticationResponse {
  token: string;
  user: AuthenticatedUser;
}

export interface ICategory {
  id?: number;
  name: string;
}

// MUDANÇA: Adicionar o campo url_image
export interface IProduct {
    id?: number;
    name: string;
    price: number;
    description: string;
    image: string;          // Renomeado de url_image para image
    installmentInfo?: string; // Novo campo
    specifications?: string[]; // Novo campo
    gallery?: string[];     // Novo campo
    category: ICategory;
}

// ADIÇÃO: Interface para o item do menu de categoria
export interface ICategoryMenuItem {
  id: number;
  label: string;
  command?: () => void;
}

// ADIÇÃO: Interface para Item do Carrinho (Preparação para próxima etapa)
export interface ICartItem {
  product: IProduct;
  quantity: number;
}
export default TopMenu;

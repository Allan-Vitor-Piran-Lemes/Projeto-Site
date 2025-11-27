import type { IProduct, IResponse } from "@/commons/types";
import { api } from "@/lib/axios";

// MUDANÇA: Usar productURL
const productURL = "/products"; 

/**
 * Função para salvar um produto
 * @param product - Dados do produto que será salvo
 * @returns - Retorna uma Promise com a resposta da API
 **/
const save = async (product: IProduct): Promise<IResponse> => {
  let response = {} as IResponse;
  try {
    const data = product.id 
        ? await api.put(`${productURL}/${product.id}`, product)
        : await api.post(productURL, product);

    response = {
      status: data.status,
      success: true,
      message: "Product saved successfully!", // MUDANÇA: Tradução
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: err.response?.status || 500,
      success: false,
      message: "Failed to save product.", // MUDANÇA: Tradução
      data: err.response?.data,
    };
  }
  return response;
};

/**
 * Função para buscar todos os produtos ou filtrar por categoria
 * @param categoryId - Id da categoria para filtrar. Opcional.
 * @returns - Retorna uma Promise com a resposta da API com a lista de produtos
 **/
const findAll = async (categoryId?: number): Promise<IResponse> => {
  let response = {} as IResponse;
  try {
    // MUDANÇA: Construir a URL com filtro
    const url = categoryId ? `${productURL}/category/${categoryId}` : productURL;
    const data = await api.get(url); 

    response = {
      status: 200,
      success: true,
      message: "Product list loaded successfully!", // MUDANÇA: Tradução
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: err.response?.status || 500,
      success: false,
      message: "Failed to load product list.", // MUDANÇA: Tradução
      data: err.response?.data,
    };
  }
  return response;
};

/**
 * Função para remover um produto
 */
const remove = async (id: number): Promise<IResponse> => {
    let response = {} as IResponse;
    try {
        const data = await api.delete(`${productURL}/${id}`);
        response = {
            status: 200,
            success: true,
            message: "Product removed successfully!", // MUDANÇA: Tradução
            data: data.data,
        };
    } catch (err: any) {
        response = {
            status: err.response?.status || 500,
            success: false,
            message: "Failed to remove product.", // MUDANÇA: Tradução
            data: err.response?.data,
        };
    }
    return response;
};

/**
 * Função para buscar um produto pelo id
 */
const findById = async (id: number): Promise<IResponse> => {
    let response = {} as IResponse;
    try {
        const data = await api.get(`${productURL}/${id}`);
        response = {
            status: 200,
            success: true,
            message: "Product loaded successfully!", // MUDANÇA: Tradução
            data: data.data,
        };
    } catch (err: any) {
        response = {
            status: err.response?.status || 500,
            success: false,
            message: "Failed to load product.", // MUDANÇA: Tradução
            data: err.response?.data,
        };
    }
    return response;
};

const ProductService = {
  save,
  findAll, 
  remove,
  findById,
};

export default ProductService;
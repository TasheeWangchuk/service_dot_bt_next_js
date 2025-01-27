// api/ServiceProvider/itemService.ts
import axios from 'axios';

interface Item {
  id: string;
  name: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateItemDto {
  name: string;
  category: string;
}

class ItemService {
  static create(name: string) {
    throw new Error('Method not implemented.');
  }
  static delete(id: string) {
    throw new Error('Method not implemented.');
  }
  static getAll() {
    throw new Error('Method not implemented.');
  }
  private baseURL: string;

  constructor(category: string) {
    // this.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/${category}`; 
    this.baseURL = 'https://service-bhutan-api.onrender.com/api/v1/users/${category}';
    const localstorage = localStorage.getItem('tokens');
    const AuthToken = localstorage ? JSON.parse(localstorage).access : '';
    axios.defaults.headers.common['Authorization'] = `Bearer ${AuthToken}`;
  }

  async getAll(): Promise<Item[]> {
    try {
      const response = await axios.get<Item[]>(this.baseURL);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }

  async create(name: string): Promise<Item> {
    try {
      const dto: CreateItemDto = {
        name,
        category: this.baseURL.split('/').pop() || ''
      };
      const response = await axios.post<Item>(this.baseURL, dto);
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${id}`);
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  }
}

export default ItemService;
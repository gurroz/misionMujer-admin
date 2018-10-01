import {Category} from '../categories/category.model';

export class Teaching {
  id: string;
  title: string;
  type: string;
  image: string;
  cover: string;
  description: string;
  content: string;
  categories: Category[];
  file: string;
}

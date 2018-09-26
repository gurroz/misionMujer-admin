import {Category} from '../categories/category.model';

export class Teaching {
  id: string;
  title: string;
  type: string;
  image: string;
  description: string;
  categories: Category[];
  file: string;
}

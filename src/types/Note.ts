import {Image} from './Image';

export type Note = {
  id: string | null;
  title: string;
  subtitle?: string;
  content: string;
  color: string;
  date: string;
  image?: Image;
};

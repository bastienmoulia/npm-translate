import { History } from './history.model';

export interface Translation {
  key: string;
  langs?: any;
  history?: History[];
}

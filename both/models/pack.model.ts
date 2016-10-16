import { Translation } from './translation.model';

export interface Pack {
  _id: string;
  langs: string[];
  owner?: string;
  public: boolean;
  translations: Translation[];
  progression?: number;
}

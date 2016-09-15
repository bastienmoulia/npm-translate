export interface IPack {
  _id?: string;
  langs: string[];
  name: string;
  owner?: string;
  public: boolean;
  translations?: ITranslations[];
}
export interface ITranslations {
  key: string;
  langs?: any;
}
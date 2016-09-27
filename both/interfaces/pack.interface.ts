export interface IPack {
  _id: string;
  langs: string[];
  owner?: string;
  public: boolean;
  translations?: ITranslations[];
  progression?: number;
}
export interface ITranslations {
  key: string;
  langs?: any;
}
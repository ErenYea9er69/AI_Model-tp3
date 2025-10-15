import { Categorie } from "./categorie.model";


export class AIModel {
  idModel?: number;
  name?: string;
  version?: string;
  trainingDate?: Date;
  accuracy?: number;
  categorie! : Categorie;

}
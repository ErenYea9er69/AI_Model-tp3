import { Injectable } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { Categorie } from "../model/categorie.model";

@Injectable({
  providedIn: 'root',
})
export class AIModelService {
  aiModels: AIModel[];
  aiModel!: AIModel;
  categories!: Categorie[];

  constructor() {
    this.categories = [
      { idCat: 1, nomCat: "Open-source" },
      { idCat: 2, nomCat: "Close-source" }
    ];

    this.aiModels = [
      {
        idModel: 1,
        name: "GPT-4",
        version: "4.0",
        trainingDate: new Date("01/14/2023"),
        accuracy: 95.5,
        categorie: { idCat: 1, nomCat: "Close-source" }
      },
      {
        idModel: 2,
        name: "BERT",
        version: "2.0",
        trainingDate: new Date("12/17/2022"),
        accuracy: 88.3,
        categorie: { idCat: 1, nomCat: "Close-source" }
      },
      {
        idModel: 3,
        name: "Kimi",
        version: "2",
        trainingDate: new Date("02/20/2024"),
        accuracy: 92.7,
        categorie: { idCat: 2, nomCat: "Open-source" }
      }
    ];
  }

  listeAIModels(): AIModel[] {
    return this.aiModels;
  }

  ajouterAIModel(model: AIModel) {
    this.aiModels.push(model);
  }

  supprimerAIModel(model: AIModel) {
    const index = this.aiModels.indexOf(model, 0);
    if (index > -1) {
      this.aiModels.splice(index, 1);
    }
  }

  consulterAIModel(id: number): AIModel {
    this.aiModel = this.aiModels.find((m) => m.idModel == id)!;
    return this.aiModel;
  }

  updateAIModel(model: AIModel) {
    const index = this.aiModels.indexOf(model, 0);
    if (index > -1) {
      this.aiModels.splice(index, 1);
      this.aiModels.splice(index, 0, model);
    }
  }

  listeCategories():Categorie[] {
return this.categories;
}
consulterCategorie(id:number): Categorie{
return this.categories.find(cat => cat.idCat == id)!;
}

}
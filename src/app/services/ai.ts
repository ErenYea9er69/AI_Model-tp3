import { Injectable } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { AICategory } from "../model/AICategory.model";

@Injectable({
  providedIn: 'root',
})
export class AIModelService {
  aiModels: AIModel[];
  categories: AICategory[];
  aiModel!: AIModel;

  constructor() {
    this.categories = [
      { idCat: 1, nomCat: "Open-source" },
      { idCat: 2, nomCat: "Close-source" }
    ];

    this.aiModels = [
      {
        idAI: 1,
        nomAI: "GPT-4",
        prixAI: 2500.5,
        dateCreation: new Date("01/14/2024"),
        aiCategory: { idCat: 2, nomCat: "Close-source" }
      },
      {
        idAI: 2,
        nomAI: "Claude 3.5",
        prixAI: 2200.0,
        dateCreation: new Date("12/17/2023"),
        aiCategory: { idCat: 2, nomCat: "Close-source" }
      },
      {
        idAI: 3,
        nomAI: "Mistral 7B",
        prixAI: 0.0,
        dateCreation: new Date("02/20/2024"),
        aiCategory: { idCat: 1, nomCat: "Open-source" }
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
    const index = this.aiModels.findIndex((m) => m.idAI === model.idAI);
    if (index > -1) {
      this.aiModels.splice(index, 1);
    }
  }

  consulterAIModel(id: number): AIModel {
    this.aiModel = this.aiModels.find((m) => m.idAI == id)!;
    return this.aiModel;
  }

  updateAIModel(model: AIModel) {
    const index = this.aiModels.findIndex((m) => m.idAI === model.idAI);
    if (index > -1) {
      this.aiModels[index] = model;
    }
  }

  listeCategories(): AICategory[] {
    return this.categories;
  }

  consulterCategorie(id: number): AICategory {
    return this.categories.find(cat => cat.idCat == id)!;
  }

  rechercherParCategorie(idCat: number): AIModel[] {
    return this.aiModels.filter((model) => model.aiCategory?.idCat == idCat);
  }
}
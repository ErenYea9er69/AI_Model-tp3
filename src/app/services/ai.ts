import { Injectable } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { OpenState } from "../model/OpenState.model";

@Injectable({
  providedIn: 'root',
})
export class AIModelService {
  aiModels: AIModel[];
  aiModel!: AIModel;
  OpenStates!: OpenState[];
  aiModelrecherche!: AIModel[];

  constructor() {
    this.OpenStates = [
      { idstate: 1, nomstate: "Open-source" },
      { idstate: 2, nomstate: "Close-source" }
    ];

    this.aiModels = [
      {
        idModel: 1,
        name: "GPT-4",
        version: "4.0",
        trainingDate: new Date("01/14/2023"),
        accuracy: 95.5,
        OpenState: { idstate: 2, nomstate: "Close-source" }
      },
      {
        idModel: 2,
        name: "BERT",
        version: "3.5",
        trainingDate: new Date("12/17/2022"),
        accuracy: 88.3,
        OpenState: { idstate: 2, nomstate: "Close-source" }
      },
      {
        idModel: 3,
        name: "Kimi",
        version: "2",
        trainingDate: new Date("02/20/2024"),
        accuracy: 92.7,
        OpenState: { idstate: 1, nomstate: "Open-source" }
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

  listestate():OpenState[] {
return this.OpenStates;
}
consulterCategorie(id:number): OpenState{
return this.OpenStates.find(cat => cat.idstate == id)!;
}

rechercherParCategorie(IdS: number): AIModel[]{
this.aiModelrecherche = [ ] ;
this.aiModels.forEach(( cur, index) => {

if(IdS== cur.OpenState.idstate) {
console.log("cur "+ cur);
this.aiModelrecherche.push(cur);}
});
return this.aiModelrecherche;
}
}
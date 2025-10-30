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
        name: "GPT-5",
        version: "5.0",
        trainingDate: new Date("04/15/2025"),
        accuracy: 97.5,
        OpenState: { idstate: 2, nomstate: "Close-source" },
        email: "gpt5@example.com"
      },
      {
        idModel: 2,
        name: "Claude 3.5 Sonnet",
        version: "3.5",
        trainingDate: new Date("07/10/2024"),
        accuracy: 96.1,
        OpenState: { idstate: 2, nomstate: "Close-source" },
        email: "claude3.5.sonnet@example.com"
      },
      {
        idModel: 3,
        name: "Grok 3",
        version: "3.0",
        trainingDate: new Date("08/05/2024"),
        accuracy: 94.3,
        OpenState: { idstate: 2, nomstate: "Close-source" },
        email: "grok3@example.com"
      },
      {
        idModel: 4,
        name: "Gemini 1.5 Pro",
        version: "1.5",
        trainingDate: new Date("03/01/2024"),
        accuracy: 95.0,
        OpenState: { idstate: 2, nomstate: "Close-source" },
        email: "gemini1.5pro@example.com"
      },
      {
        idModel: 5,
        name: "Kimi Chat 2.0",
        version: "2.0",
        trainingDate: new Date("02/20/2024"),
        accuracy: 92.7,
        OpenState: { idstate: 1, nomstate: "Open-source" },
        email: "kimi.chat2@example.com"
      },
      {
        idModel: 6,
        name: "DeepSeek V2",
        version: "2.0",
        trainingDate: new Date("05/22/2024"),
        accuracy: 93.4,
        OpenState: { idstate: 1, nomstate: "Open-source" },
        email: "deepseekv2@example.com"
      },
      {
        idModel: 7,
        name: "LongCat XL",
        version: "1.3",
        trainingDate: new Date("06/11/2024"),
        accuracy: 91.2,
        OpenState: { idstate: 1, nomstate: "Open-source" },
        email: "longcatxl@example.com"
      },
      {
        idModel: 8,
        name: "Mistral 7B",
        version: "1.0",
        trainingDate: new Date("10/10/2023"),
        accuracy: 89.7,
        OpenState: { idstate: 1, nomstate: "Open-source" },
        email: "mistral7b@example.com"
      },
      {
        idModel: 9,
        name: "LLaMA 3",
        version: "3.0",
        trainingDate: new Date("05/20/2024"),
        accuracy: 91.5,
        OpenState: { idstate: 1, nomstate: "Open-source" },
        email: "llama3@example.com"
      },
      {
        idModel: 10,
        name: "Claude 3 Opus",
        version: "3.0",
        trainingDate: new Date("05/01/2024"),
        accuracy: 96.5,
        OpenState: { idstate: 2, nomstate: "Close-source" },
        email: "claude3.opus@example.com"
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
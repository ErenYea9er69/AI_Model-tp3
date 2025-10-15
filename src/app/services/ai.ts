import { Injectable } from '@angular/core';
import { AIModel } from '../model/ai.model';
@Injectable({
  providedIn: 'root',
})
export class AIModelService {
  aiModels: AIModel[];
  aiModel!: AIModel;
  //un tableau de AIModel
  constructor() {
    this.aiModels = [
      {
        idModel: 1,
        name: 'ChatGPT',
        version: '3.5',
        trainingDate: new Date('01/14/2011'),
        accuracy: 0.92,
      },
      {
        idModel: 2,
        name: 'Bard',
        version: '1.0',
        trainingDate: new Date('12/17/2010'),
        accuracy: 0.88,
      },
      {
        idModel: 3,
        name: 'Claude',
        version: '2.1',
        trainingDate: new Date('02/20/2020'),
        accuracy: 0.90,
      },
    ];
  }
  listeAIModels(): AIModel[] {
    return this.aiModels;
  }
  ajouterAIModel(model: AIModel) {
    this.aiModels.push(model);
  }
  supprimerAIModel(model: AIModel) {
    //supprimer le modèle model du tableau aiModels
    const index = this.aiModels.indexOf(model, 0);
    if (index > -1) {
      this.aiModels.splice(index, 1);
    }
    //ou Bien
    /* this.aiModels.forEach((cur, index) => {
if(model.idModel === cur.idModel) {
this.aiModels.splice(index, 1);
}
}); */
  }

  consulterAIModel(id: number): AIModel {
    this.aiModel = this.aiModels.find((m) => m.idModel == id)!;
    return this.aiModel;
  }
  updateAIModel(model: AIModel) {
    //chercher le modèle model du tableau aiModels
    const index = this.aiModels.indexOf(model, 0);
    if (index > -1) {
      this.aiModels.splice(index, 1); //supprimer l'ancien éléments
      this.aiModels.splice(index, 0, model); // insérer le nouvel élément
    }
  }
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { OpenState } from '../model/OpenState.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ai-model',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-ai-model.html',
})
export class AddAIModelComponent {

  newAIModel: AIModel = new AIModel();
  categories! : OpenState[];
  newIdCat! : number;
  newCategorie! : OpenState;
  message: string = '';

  constructor(private aiModelService: AIModelService, 
    private router: Router) {}

    ngOnInit(): void {
    this.categories = this.aiModelService.listestate();
  }

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Ajoute un modèle IA
 * 
 * @remarks
 * Cette méthode ajoute un modèle IA
 * Elle prend en paramètre l'ID de la catégorie
 * Elle met à jour le message en cas d'ajout réussi
 * Elle redirige vers la page des modèles IA
 */
/*******  38bda0dd-c9dc-4411-90e0-2b743aa2d6f7  *******/  addAIModel() {

    this.newCategorie = this.aiModelService.consulterCategorie(this.newIdCat);
    this.newAIModel.OpenState = this.newCategorie;
    if (this.newAIModel.idModel && this.newAIModel.name && this.newAIModel.version && this.newAIModel.accuracy) {
      this.aiModelService.ajouterAIModel(this.newAIModel);
      this.message = "Modèle " + this.newAIModel.name + " ajouté avec succès !";

      this.router.navigate(['/aiModels']);
    }

  }
}
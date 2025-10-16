import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ai-model',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-ai-model.html',
})
export class AddAIModelComponent {

  newAIModel: AIModel = new AIModel();
  categories! : Categorie[];
  newIdCat! : number;
  newCategorie! : Categorie;
  message: string = '';

  constructor(private aiModelService: AIModelService, private router: Router) {}

    ngOnInit(): void {
    this.categories = this.aiModelService.listeCategories();
  }

  addAIModel() {

    this.newCategorie = this.aiModelService.consulterCategorie(this.newIdCat);
    this.newAIModel.categorie = this.newCategorie;
    if (this.newAIModel.idModel && this.newAIModel.name && this.newAIModel.version && this.newAIModel.accuracy) {
      this.aiModelService.ajouterAIModel(this.newAIModel);
      this.message = "Modèle " + this.newAIModel.name + " ajouté avec succès !";
      
    this.router.navigate(['produits']);
      

}}}
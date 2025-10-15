import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';

@Component({
  selector: 'app-add-ai-model',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-ai-model.html',
})
export class AddAIModelComponent {

  newAIModel: AIModel = new AIModel();

  message: string = '';

  constructor(private aiModelService: AIModelService) {}

  addAIModel() {
    if (this.newAIModel.idModel && this.newAIModel.name && this.newAIModel.version && this.newAIModel.accuracy) {
      this.aiModelService.ajouterAIModel(this.newAIModel);
      this.message = "Modèle " + this.newAIModel.name + " ajouté avec succès !";
      
      // Clear the form
      this.newAIModel = new AIModel();
      

}}}
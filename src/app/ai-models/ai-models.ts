import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ai-models',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './ai-models.html',
})
export class AIModels  {
  aiModels? : AIModel[];


constructor(  private aiModelService : AIModelService) {

  this.aiModels = this.aiModelService.listeAIModels();

  }
  supprimerAIModel(model: AIModel){

    //console.log(model);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.aiModelService.supprimerAIModel(model);
  }

  ngOnInit(): void {
  } 
}
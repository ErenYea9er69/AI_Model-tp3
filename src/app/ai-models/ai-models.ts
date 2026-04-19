import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-ai-models',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ai-models.html',
})
export class AIModels implements OnInit {
  aiModels?: AIModel[];

  constructor(private aiModelService: AIModelService, public authService: Auth) {}

  ngOnInit(): void {
    this.chargerAIModels();
  }

  chargerAIModels() {
    this.aiModelService.listeAIModels().subscribe((prods) => {
      console.log(prods);
      this.aiModels = prods;
    });
  }

  supprimerAIModel(model: AIModel) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.aiModelService.supprimerAIModel(model.idAI!).subscribe(() => {
        console.log("modèle supprimé");
        this.chargerAIModels();
      });
  }
}
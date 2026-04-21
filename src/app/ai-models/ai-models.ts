import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ai-models',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ai-models.html',
})
export class AIModels implements OnInit {
  aiModels? : AIModel[];
  apiURL: string = 'http://localhost:8080/aimodels/api';

  constructor(private aiModelService: AIModelService, public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerAIModels();
  }

  chargerAIModels() {
    this.aiModelService.listeAIModels().subscribe(prods => {
      this.aiModels = prods;
    });
  }

  supprimerAIModel(p: AIModel) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.aiModelService.supprimerAIModel(p.idAI).subscribe(() => {
        this.chargerAIModels();
      });
    }
  }
}
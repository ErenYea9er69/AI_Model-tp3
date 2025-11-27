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
  aiModels: AIModel[] = [];

  constructor(private aiModelService: AIModelService, public authService: Auth) {}

  ngOnInit(): void {
    this.loadAIModels();
  }

  loadAIModels(): void {
    this.aiModelService.listeAIModels().subscribe({
      next: (data) => {
        this.aiModels = data || [];
      },
      error: (err) => {
        console.error('Erreur chargement modèles:', err);
        this.aiModels = [];
      }
    });
  }

  supprimerAIModel(model: AIModel) {
    if (!model.idModel) {
      console.error('ID du modèle manquant');
      return;
    }

    let conf = confirm("Êtes-vous sûr de vouloir supprimer ce modèle ?");
    if (conf) {
      this.aiModelService.supprimerAIModel(model).subscribe({
        next: () => {
          this.loadAIModels();
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
          alert('Erreur lors de la suppression du modèle');
        }
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { OpenState } from '../model/OpenState.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recherche-par-state',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recherche-par-state.html',
})
export class RechercheParState implements OnInit {
  aiModels: AIModel[] = [];
  OpenState: OpenState[] = [];
  IdS!: number;

  constructor(private aiModelService: AIModelService) {}

  ngOnInit(): void {
    this.loadOpenStates();
  }

  loadOpenStates(): void {
    this.aiModelService.listestate().subscribe({
      next: (data) => {
        this.OpenState = data;
      },
      error: (err) => {
        console.error('Erreur chargement OpenStates:', err);
      }
    });
  }

  onChange() {
    if (this.IdS) {
      this.aiModelService.rechercherParCategorie(this.IdS).subscribe({
        next: (data) => {
          this.aiModels = data;
        },
        error: (err) => {
          console.error('Erreur recherche par state:', err);
        }
      });
    }
  }

  supprimerAIModel(model: AIModel) {
    let conf = confirm('Êtes-vous sûr ?');
    if (conf && model.idModel) {
      this.aiModelService.supprimerAIModel(model).subscribe({
        next: () => {
          if (this.IdS) {
            this.onChange(); // Recharger la recherche
          }
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
        }
      });
    }
  }
}
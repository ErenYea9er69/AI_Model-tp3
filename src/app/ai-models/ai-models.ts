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
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

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

  get sortedModels(): AIModel[] {
    if (!this.sortColumn || !this.aiModels.length) {
      return this.aiModels;
    }

    return [...this.aiModels].sort((a, b) => {
      let aVal: any, bVal: any;
      
      switch (this.sortColumn) {
        case 'name':
          aVal = a.name?.toLowerCase() || '';
          bVal = b.name?.toLowerCase() || '';
          break;
        case 'accuracy':
          aVal = a.accuracy ?? 0;
          bVal = b.accuracy ?? 0;
          break;
        default:
          return 0;
      }

      // Reverse logic for accuracy column
      const multiplier = this.sortColumn === 'accuracy' ? -1 : 1;
      
      if (aVal < bVal) return (this.sortDirection === 'asc' ? -1 : 1) * multiplier;
      if (aVal > bVal) return (this.sortDirection === 'asc' ? 1 : -1) * multiplier;
      return 0;
    });
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  getSortArrow(column: string): string {
    if (this.sortColumn !== column) return '';
    return this.sortDirection === 'asc' ? '↑' : '↓';
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
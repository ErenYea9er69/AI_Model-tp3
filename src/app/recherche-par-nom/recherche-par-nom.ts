import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit {
  allAImodels: AIModel[] = [];
  aiModels: AIModel[] = [];
  searchTerm: string = '';

  constructor(private AIModelService: AIModelService) {}

  ngOnInit(): void {
    this.loadAllAIModels();
  }

  loadAllAIModels(): void {
    this.AIModelService.listeAIModels().subscribe({
      next: (data) => {
        this.allAImodels = data;
        this.aiModels = data;
      },
      error: (err) => {
        console.error('Erreur chargement modèles:', err);
      }
    });
  }

  onKeyUp(filterText: string) {
    this.aiModels = this.allAImodels.filter(item =>
      item.name?.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  supprimerAIModel(model: AIModel) {
    let conf = confirm('Êtes-vous sûr ?');
    if (conf && model.idModel) {
      this.AIModelService.supprimerAIModel(model).subscribe({
        next: () => {
          this.loadAllAIModels();
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
        }
      });
    }
  }
}
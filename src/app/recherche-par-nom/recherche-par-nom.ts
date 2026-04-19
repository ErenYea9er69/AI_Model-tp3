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
})
export class RechercheParNom implements OnInit {

  nomAI!: string;
  allAImodels!: AIModel[];
  aiModels!: AIModel[];
  searchTerm! : string; 

  constructor(private aiModelService: AIModelService) {}

  ngOnInit(): void {
    this.allAImodels = this.aiModelService.listeAIModels();
    this.aiModels = this.allAImodels;
  }

  onKeyUp(filterText: string) {
    this.aiModels = this.allAImodels.filter(item =>
      item.nomAI!.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  supprimerAIModel(model: AIModel) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.aiModelService.supprimerAIModel(model);
      this.allAImodels = this.aiModelService.listeAIModels();
      this.aiModels = this.allAImodels;
    }
  }
}
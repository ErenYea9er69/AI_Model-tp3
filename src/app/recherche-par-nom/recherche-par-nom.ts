import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchFilterPipe } from '../search-filter-pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit {

  nomAI!: string;
  allAImodels!: AIModel[];
  aiModels!: AIModel[];
  searchTerm! : string; 

  constructor(private AIModelService: AIModelService) {}

  ngOnInit(): void {
    this.allAImodels = this.AIModelService.listeAIModels();
    this.aiModels = this.allAImodels;
  }

  onKeyUp(filterText: string) {
    this.aiModels = this.allAImodels.filter(item =>
      item.name!.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  supprimerAIModel(model: AIModel) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.AIModelService.supprimerAIModel(model);
      this.allAImodels = this.AIModelService.listeAIModels();
      this.aiModels = this.allAImodels;
    }
  }
}
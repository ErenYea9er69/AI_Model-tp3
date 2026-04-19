import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
})
export class RechercheParNom implements OnInit {
  nomAI!: string;
  allAImodels!: AIModel[];
  aiModels!: AIModel[];
  searchTerm!: string;

  constructor(private aiModelService: AIModelService) {}

  ngOnInit(): void {
    this.aiModelService.listeAIModels().subscribe((prods) => {
      this.allAImodels = prods;
      this.aiModels = prods;
    });
  }

  rechercherProds() {
    if (this.nomAI) {
      this.aiModelService.rechercherParNom(this.nomAI).subscribe((prods) => {
        this.aiModels = prods;
      });
    } else {
      this.aiModels = this.allAImodels;
    }
  }

  onKeyUp(filterText: string) {
    this.aiModels = this.allAImodels.filter((item) =>
      item.nomAI!.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { AICategory } from '../model/AICategory.model';
import { AIModelService } from '../services/ai';
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
  aiModels! : AIModel[];
  categories! : AICategory[];
  idCat! : number;

  constructor(private aiModelService : AIModelService) { }

  ngOnInit(): void {
    this.aiModelService.listeCategories().subscribe(cats => {
      this.categories = cats;
    });
    this.aiModels = [];
  }

  onChange() {
    this.aiModelService.rechercherParCategorie(this.idCat).subscribe(prods => {
      this.aiModels = prods;
    });
  }

  supprimerAIModel(model: AIModel) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.aiModelService.supprimerAIModel(model.idAI!).subscribe(() => {
        this.onChange();
      });
    }
  }
}
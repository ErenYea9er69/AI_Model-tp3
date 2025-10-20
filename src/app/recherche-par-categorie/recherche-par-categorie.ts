import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { OpenState } from '../model/OpenState.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recherche-par-categorie',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recherche-par-categorie.html',
})
export class RechercheParCategorie implements OnInit {
  aiModels!: AIModel[]; 
  OpenState!: OpenState[]; 
  IdS!: number; 

  constructor(private aiModelService: AIModelService) {}

  ngOnInit(): void {
    this.OpenState = this.aiModelService.listestate();
    this.aiModels = [];
    
  }

  onChange() {
    console.log('State changed to:', this.IdS);
    this.aiModels = this.aiModelService.rechercherParCategorie(this.IdS);
  }

  supprimerAIModel(model: AIModel) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.aiModelService.supprimerAIModel(model);
      this.aiModels = this.aiModelService.listeAIModels();
    }
  }



}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AIModel } from '../model/ai.model';
import { AICategory } from '../model/AICategory.model';
import { AIModelService } from '../services/ai';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-ai-model',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-ai-model.html',
})
export class AddAIModelComponent implements OnInit {
  newAIModel = new AIModel();
  categories! : AICategory[];
  newIdCat! : number;
  newAICategory! : AICategory;

  constructor(private aiModelService: AIModelService, private router: Router) {}

  ngOnInit() {
    this.categories = this.aiModelService.listeCategories();
  }

  addAIModel() {
    this.newAICategory = this.aiModelService.consulterCategorie(this.newIdCat);
    this.newAIModel.aiCategory = this.newAICategory;
    this.aiModelService.ajouterAIModel(this.newAIModel);
    this.router.navigate(['ai-models']);
  }
}
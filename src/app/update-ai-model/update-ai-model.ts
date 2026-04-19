import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AIModel } from '../model/ai.model';
import { AICategory } from '../model/AICategory.model';
import { AIModelService } from '../services/ai';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-ai-model',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-ai-model.html',
})
export class UpdateAIModelComponent implements OnInit {
  currentAIModel = new AIModel();
  categories! : AICategory[];
  updatedCatId! : number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private aiModelService: AIModelService
  ) {}

  ngOnInit(): void {
    this.categories = this.aiModelService.listeCategories();
    this.currentAIModel = this.aiModelService.consulterAIModel(this.activatedRoute.snapshot.params['id']);
    this.updatedCatId = this.currentAIModel.aiCategory?.idCat!;
  }

  updateAIModel() {
    this.currentAIModel.aiCategory = this.aiModelService.consulterCategorie(this.updatedCatId);
    this.aiModelService.updateAIModel(this.currentAIModel);
    this.router.navigate(['ai-models']);
  }
}
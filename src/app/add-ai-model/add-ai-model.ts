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

  constructor(private aiModelService: AIModelService, private router: Router) {}

  ngOnInit() {
    this.aiModelService.listeCategories().subscribe(cats => {
      this.categories = cats;
      console.log(cats);
    });
  }

  addAIModel() {
    this.newAIModel.aiCategory = this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.aiModelService.ajouterAIModel(this.newAIModel).subscribe(prod => {
      console.log(prod);
      this.router.navigate(['ai-models']);
    });
  }
}
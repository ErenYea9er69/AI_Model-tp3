import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { AICategory } from "../model/AICategory.model";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-ai-model',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-ai-model.html',
})
export class AddAIModel implements OnInit {
  newAIModel = new AIModel();
  categories! : AICategory[];
  newIdCat! : number;
  
  uploadedImage!: File;
  imagePath: any;

  constructor(private aiModelService: AIModelService, private router: Router) {}

  ngOnInit(): void {
    this.aiModelService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    }
  }

  addAIModel() {
    this.newAIModel.aiCategory = this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.aiModelService
      .ajouterAIModel(this.newAIModel)
      .subscribe((prod : AIModel) => {
        this.aiModelService
          .uploadImageFS(this.uploadedImage, this.uploadedImage.name, prod.idAI)
          .subscribe((response: any) => {
            this.router.navigate(['aiModels']);
          });
      });
  }
}
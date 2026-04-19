import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { AICategory } from "../model/AICategory.model";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-ai-model',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-ai-model.html',
})
export class UpdateAIModel implements OnInit {
  currentAIModel = new AIModel();
  categories! : AICategory[];
  updatedCatId! : number;

  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private aiModelService: AIModelService
  ) {}

  ngOnInit(): void {
    this.aiModelService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
    });

    this.aiModelService.consulterAIModel(this.activatedRoute.snapshot.params['id']).subscribe(prod => {
      this.currentAIModel = prod;
      this.updatedCatId = this.currentAIModel.aiCategory.idCat;

      if (this.currentAIModel.image) {
        this.aiModelService.loadImage(this.currentAIModel.image.idImage).subscribe((img: Image) => {
          this.myImage = 'data:' + img.type + ';base64,' + img.image;
        });
      }
    });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  updateAIModel() {
    this.currentAIModel.aiCategory = this.categories.find(cat => cat.idCat == this.updatedCatId)!;

    if (this.isImageUpdated) {
      this.aiModelService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentAIModel.image = img;
          this.aiModelService.updateAIModel(this.currentAIModel).subscribe(() => {
            this.router.navigate(['aiModels']);
          });
        });
    } else {
      this.aiModelService.updateAIModel(this.currentAIModel).subscribe(() => {
        this.router.navigate(['aiModels']);
      });
    }
  }
}
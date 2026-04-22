import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AIWrapper } from '../model/ai.model';
import { AIWrapperService } from '../services/ai';
import { AITheme } from "../model/AITheme.model";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-ai-wrapper',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-ai-wrapper.html',
})
export class AddAIWrapper implements OnInit {
  newAIWrapper = new AIWrapper();
  themes! : AITheme[];
  newIdCat! : number;
  
  uploadedImage!: File;
  imagePath: any;

  constructor(private aiWrapperService: AIWrapperService, private router: Router) {}

  ngOnInit(): void {
    this.aiWrapperService.listeThemes().subscribe(cats => {
      this.themes = cats;
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

  addAIWrapper() {
    this.newAIWrapper.aiTheme = this.themes.find(cat => cat.idTheme == this.newIdCat)!;
    this.aiWrapperService
      .ajouterAIWrapper(this.newAIWrapper)
      .subscribe((prod : AIWrapper) => {
        this.aiWrapperService
          .uploadImageFS(this.uploadedImage, this.uploadedImage.name, prod.idWrapper)
          .subscribe((response: any) => {
            this.router.navigate(['aiWrappers']);
          });
      });
  }
}
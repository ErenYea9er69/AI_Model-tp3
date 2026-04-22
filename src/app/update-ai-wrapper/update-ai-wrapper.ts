import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AIWrapper } from '../model/ai.model';
import { AIWrapperService } from '../services/ai';
import { AITheme } from "../model/AITheme.model";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Image } from '../model/image.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-update-ai-wrapper',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-ai-wrapper.html',
})
export class UpdateAIWrapper implements OnInit {
  currentAIWrapper = new AIWrapper();
  themes! : AITheme[];
  updatedCatId! : number;

  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  apiURL: string = environment.apiURL;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private aiWrapperService: AIWrapperService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.aiWrapperService.listeThemes().subscribe(cats => {
      this.themes = cats;
      this.cdr.detectChanges();
    });

    this.aiWrapperService.consulterAIWrapper(this.activatedRoute.snapshot.params['id']).subscribe(prod => {
      this.currentAIWrapper = prod;
      // Initialize images array if not present (DTO doesn't include it)
      if (!this.currentAIWrapper.images) {
        this.currentAIWrapper.images = [];
      }
      this.updatedCatId = this.currentAIWrapper.aiTheme.idTheme;
      this.cdr.detectChanges();
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
        this.cdr.detectChanges();
      };
    }
  }

  // "Ajouter Image" — adds an extra image to the DB gallery (image table)
  onAddImageAIWrapper() {
    if (!this.uploadedImage) {
      alert('Veuillez sélectionner une image d\'abord.');
      return;
    }
    this.aiWrapperService
      .uploadImageProd(this.uploadedImage, this.uploadedImage.name, this.currentAIWrapper.idWrapper)
      .subscribe((img: Image) => {
        this.currentAIWrapper.images.push(img);
        this.cdr.detectChanges();
      });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.aiWrapperService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentAIWrapper.images.indexOf(img, 0);
        if (index > -1) {
          this.currentAIWrapper.images.splice(index, 1);
        }
        this.cdr.detectChanges();
      });
    }
  }

  // "Modifier le Modèle" — updates model data + optional FS image
  updateAIWrapper() {
    this.currentAIWrapper.aiTheme = this.themes.find(cat => cat.idTheme == this.updatedCatId)!;

    if (this.isImageUpdated) {
      // Upload the new image to filesystem FIRST
      this.aiWrapperService
        .uploadImageFS(this.uploadedImage, this.uploadedImage.name, this.currentAIWrapper.idWrapper)
        .subscribe(() => {
          // After upload, the backend already set imagePath in DB.
          // Update the local model's imagePath so the next PUT doesn't overwrite it to null.
          this.currentAIWrapper.imagePath = this.currentAIWrapper.idWrapper + '.jpg';
          this.aiWrapperService.updateAIWrapper(this.currentAIWrapper).subscribe(() => {
            this.router.navigate(['aiWrappers']);
          });
        });
    } else {
      this.aiWrapperService.updateAIWrapper(this.currentAIWrapper).subscribe(() => {
        this.router.navigate(['aiWrappers']);
      });
    }
  }
}
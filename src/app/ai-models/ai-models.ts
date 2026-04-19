import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { AuthService } from '../services/auth';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-ai-models',
  standalone: true,
  imports: [],
  templateUrl: './ai-models.html',
})
export class AIModels implements OnInit {
  aiModels? : AIModel[];

  constructor(private aiModelService: AIModelService, public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerAIModels();
  }

  chargerAIModels() {
    this.aiModelService.listeAIModels().subscribe(prods => {
      this.aiModels = prods;
      this.aiModels.forEach((prod) => {
        if (prod.image) {
          this.aiModelService.loadImage(prod.image.idImage).subscribe((img: Image) => {
            prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
          });
        }
      });
    });
  }

  supprimerAIModel(p: AIModel) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.aiModelService.supprimerAIModel(p.idAI).subscribe(() => {
        console.log('Produit supprimé');
        this.chargerAIModels();
      });
    }
  }
}
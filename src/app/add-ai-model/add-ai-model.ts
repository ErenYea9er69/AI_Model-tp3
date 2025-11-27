import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AIModel } from '../model/ai.model';
import { AIModelService } from '../services/ai';
import { OpenState } from '../model/OpenState.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-ai-model',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-ai-model.html',
})
export class AddAIModelComponent implements OnInit {
  myAI!: FormGroup;
  categories: OpenState[] = [];
  message: string = '';

  constructor(
    private aiModelService: AIModelService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadOpenStates();
  }

  initializeForm(): void {
    this.myAI = this.formBuilder.group({
      idModel: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      version: ['', [Validators.required]],
      accuracy: ['', [Validators.required, Validators.min(10)]],
      trainingDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idCat: ['', [Validators.required]]
    });
  }

  loadOpenStates(): void {
    this.aiModelService.listestate().subscribe({
      next: (data) => {
        this.categories = data || [];
      },
      error: (err) => {
        console.error('Erreur chargement OpenStates:', err);
        this.message = "Erreur lors du chargement des OpenStates";
      }
    });
  }

  addAIModel() {
    if (this.myAI.invalid) {
      this.message = "Veuillez corriger les erreurs du formulaire";
      return;
    }

    const formValue = this.myAI.value;
    const newAIModel = new AIModel({
      idModel: formValue.idModel,
      name: formValue.name,
      version: formValue.version,
      accuracy: formValue.accuracy,
      trainingDate: new Date(formValue.trainingDate),
      email: formValue.email
    });

    if (!formValue.idCat) {
      this.message = "Veuillez sélectionner un OpenState";
      return;
    }

    this.aiModelService.consulterCategorie(formValue.idCat).subscribe({
      next: (state) => {
        newAIModel.openstate = state;
        
        this.aiModelService.ajouterAIModel(newAIModel).subscribe({
          next: (addedModel) => {
            this.message = "Modèle " + addedModel.name + " ajouté avec succès !";
            setTimeout(() => {
              this.router.navigate(['/aiModels']);
            }, 1500);
          },
          error: (err) => {
            console.error('Erreur ajout modèle:', err);
            this.message = "Erreur lors de l'ajout: " + (err.error?.message || err.message);
          }
        });
      },
      error: (err) => {
        console.error('Erreur chargement OpenState:', err);
        this.message = "Erreur OpenState: " + (err.error?.message || err.message);
      }
    });
  }
}
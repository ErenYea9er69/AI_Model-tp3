import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AIModelService } from '../services/ai';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OpenState } from '../model/OpenState.model';

@Component({
  selector: 'app-update-ai-model',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-ai-model.html',
})
export class UpdateAIModel implements OnInit {
  categories!: OpenState[];
  updatedCatId!: number;
  currentAIModel = new AIModel();
  myAI!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private aiModelService: AIModelService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadOpenStates();
    this.loadCurrentModel();
  }

  loadOpenStates(): void {
    this.aiModelService.listestate().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur chargement OpenStates:', err);
      }
    });
  }

  loadCurrentModel(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (!id) {
      console.error('No ID provided in route');
      this.router.navigate(['/aiModels']);
      return;
    }

    this.aiModelService.consulterAIModel(+id).subscribe({
      next: (model) => {
        this.currentAIModel = model;
        this.updatedCatId = this.currentAIModel.openstate?.idstate || 0; // Fixed: OpenState -> openstate
        this.initializeForm();
      },
      error: (err) => {
        console.error('Erreur chargement modèle:', err);
        this.router.navigate(['/aiModels']);
      }
    });
  }

  initializeForm(): void {
    this.myAI = this.formBuilder.group({
      idModel: [{ value: this.currentAIModel.idModel || '', disabled: true }, [Validators.required]],
      name: [this.currentAIModel.name || '', [Validators.required, Validators.minLength(5)]],
      version: [this.currentAIModel.version || '', [Validators.required]],
      accuracy: [this.currentAIModel.accuracy || '', [Validators.required, Validators.min(10)]],
      trainingDate: [this.formatDate(this.currentAIModel.trainingDate) || '', [Validators.required]],
      email: [this.currentAIModel.email || '', [Validators.required, Validators.email]],
      idCat: [this.updatedCatId || '', [Validators.required]]
    });
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  updateAIModel() {
    if (!this.updatedCatId) {
      console.error('OpenState ID requis');
      return;
    }

    if (this.myAI.invalid) {
      console.error('Formulaire invalide');
      return;
    }

    this.aiModelService.consulterCategorie(this.updatedCatId).subscribe({
      next: (state) => {
        this.currentAIModel.openstate = state; // Fixed: OpenState -> openstate
        
        this.aiModelService.updateAIModel(this.currentAIModel).subscribe({
          next: (updatedModel) => {
            console.log('Modèle mis à jour:', updatedModel);
            this.router.navigate(['/aiModels']);
          },
          error: (err) => {
            console.error('Erreur modification:', err);
          }
        });
      },
      error: (err) => {
        console.error('Erreur chargement OpenState:', err);
      }
    });
  }
}
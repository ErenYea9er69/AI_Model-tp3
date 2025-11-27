import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  categories: OpenState[] = [];
  currentAIModel = new AIModel();
  myAI!: FormGroup;
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private aiModelService: AIModelService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadOpenStates();
    this.loadCurrentModel();
  }

  initializeForm(): void {
    this.myAI = this.formBuilder.group({
      idModel: [{ value: '', disabled: true }, [Validators.required]],
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
        this.updateCategorySelection();
      },
      error: (err) => {
        console.error('Erreur chargement OpenStates:', err);
        this.categories = [];
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
        this.isLoading = false;
        this.updateFormValues();
        this.updateCategorySelection();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement modèle:', err);
        this.router.navigate(['/aiModels']);
      }
    });
  }

  updateFormValues(): void {
    if (this.currentAIModel && this.myAI) {
      this.myAI.patchValue({
        idModel: this.currentAIModel.idModel || '',
        name: this.currentAIModel.name || '',
        version: this.currentAIModel.version || '',
        accuracy: this.currentAIModel.accuracy || '',
        trainingDate: this.formatDate(this.currentAIModel.trainingDate),
        email: this.currentAIModel.email || ''
      }, { emitEvent: false });
    }
  }

  updateCategorySelection(): void {
    if (this.currentAIModel?.openstate?.idstate && this.categories.length > 0) {
      const catId = this.currentAIModel.openstate.idstate;
      this.myAI.patchValue({ idCat: catId }, { emitEvent: false });
    }
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
    if (this.myAI.invalid) {
      console.error('Formulaire invalide');
      return;
    }

    const formValue = this.myAI.getRawValue();
    
    this.currentAIModel.name = formValue.name;
    this.currentAIModel.version = formValue.version;
    this.currentAIModel.accuracy = formValue.accuracy;
    this.currentAIModel.trainingDate = new Date(formValue.trainingDate);
    this.currentAIModel.email = formValue.email;

    this.aiModelService.consulterCategorie(formValue.idCat).subscribe({
      next: (state) => {
        this.currentAIModel.openstate = state;
        
        this.aiModelService.updateAIModel(this.currentAIModel).subscribe({
          next: (updatedModel) => {
            console.log('Modèle mis à jour:', updatedModel);
            this.router.navigate(['/aiModels']);
          },
          error: (err) => {
            console.error('Erreur modification:', err);
            alert('Erreur lors de la mise à jour');
          }
        });
      },
      error: (err) => {
        console.error('Erreur chargement OpenState:', err);
      }
    });
  }
}
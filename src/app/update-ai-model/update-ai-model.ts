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

  categories! : OpenState[];
  updatedCatId! : number;
  currentAIModel = new AIModel();
  myAI!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router :Router,
    private aiModelService: AIModelService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.categories = this.aiModelService.listestate();

    const id = this.activatedRoute.snapshot.params['id'];
    this.currentAIModel = this.aiModelService.consulterAIModel(id);
    this.updatedCatId = this.currentAIModel.OpenState.idstate;

    this.myAI = this.formBuilder.group({
      idModel: [{ value: this.currentAIModel.idModel, disabled: true }, [Validators.required]],
      name: [this.currentAIModel.name, [Validators.required, Validators.minLength(5)]],
      version: [this.currentAIModel.version, [Validators.required]],
      accuracy: [this.currentAIModel.accuracy, [Validators.required, Validators.min(10)]],
      trainingDate: [
        new Date(this.currentAIModel.trainingDate!).toISOString().split('T')[0],
        [Validators.required],
      ],
      email: [this.currentAIModel.email, [Validators.required, Validators.email]],
      idCat: [this.updatedCatId, [Validators.required]],
    });
  }

  updateAIModel() {
    if (this.myAI.valid) {
      const formValues = this.myAI.getRawValue();
      
      const updatedModel: AIModel = {
        ...this.currentAIModel,
        ...formValues,
        trainingDate: new Date(formValues.trainingDate),
        OpenState: this.aiModelService.consulterCategorie(formValues.idCat)
      };

      this.aiModelService.updateAIModel(updatedModel);
      this.router.navigate(['aiModels']);
    }
  }
}
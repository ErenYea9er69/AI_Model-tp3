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

    this.currentAIModel = this.aiModelService.consulterAIModel(
      this.activatedRoute.snapshot.params['id']);
    this.updatedCatId=this.currentAIModel.OpenState.idstate;

    this.myAI = this.formBuilder.group({
      idModel: [{value: '', disabled: true}, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      version: ['', [Validators.required]],
      accuracy: ['', [Validators.required]],
      trainingDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idCat: ['', [Validators.required]]
    });

    console.log(this.currentAIModel);
  }

  updateAIModel() {
    this.currentAIModel.OpenState=this.aiModelService.consulterCategorie(this.updatedCatId);

    if (this.myAI.valid) {
      this.aiModelService.updateAIModel(this.currentAIModel);
      this.router.navigate(['aiModels']);
    }
  }
}
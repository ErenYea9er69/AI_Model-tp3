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

  newAIModel: AIModel = new AIModel();
  categories! : OpenState[];
  newIdCat! : number;
  newCategorie! : OpenState;
  message: string = '';
  myAI!: FormGroup;

  constructor(
    private aiModelService: AIModelService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categories = this.aiModelService.listestate();
    
    this.myAI = this.formBuilder.group({
      idModel: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      version: ['', [Validators.required]],
      accuracy: ['', [Validators.required]],
      trainingDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idCat: ['', [Validators.required]]
    });
  }

  addAIModel() {
    this.newCategorie = this.aiModelService.consulterCategorie(this.newIdCat);
    this.newAIModel.OpenState = this.newCategorie;
    
    if (this.myAI.valid) {
      this.aiModelService.ajouterAIModel(this.newAIModel);
      this.message = "Modèle " + this.newAIModel.name + " ajouté avec succès !";
      this.router.navigate(['/aiModels']);
    }
  }
}
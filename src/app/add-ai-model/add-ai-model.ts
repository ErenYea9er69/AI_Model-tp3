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
      name: ['', [Validators.required, Validators.minLength(5)]],
      version: ['', [Validators.required]],
      accuracy: ['', [Validators.required, Validators.min(10)]],
      trainingDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idCat: ['', [Validators.required]]
    });                 
  }

  addAIModel() {
    if (this.myAI.valid) {
      const formValues = this.myAI.value;
      
      const newAIModel: AIModel = {
        idModel: formValues.idModel,
        name: formValues.name,
        version: formValues.version,
        accuracy: formValues.accuracy,
        trainingDate: new Date(formValues.trainingDate),
        email: formValues.email,
        OpenState: this.aiModelService.consulterCategorie(formValues.idCat)
      };

      this.aiModelService.ajouterAIModel(newAIModel);
      this.message = "Modèle " + newAIModel.name + " ajouté avec succès !";
      this.router.navigate(['/aiModels']);
    }
  }
}
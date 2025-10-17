import { Component, OnInit } from '@angular/core';
import { AIModel } from '../model/ai.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AIModelService } from '../services/ai';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
  import { OpenState } from '../model/OpenState.model';

@Component({
  selector: 'app-update-ai-model',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-ai-model.html',
})
export class UpdateAIModel implements OnInit {


categories! : OpenState[];
updatedCatId! : number;

  currentAIModel = new AIModel();
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
     private aiModelService: AIModelService) {}
  ngOnInit() {
    // console.log(this.route.snapshot.params.id);
    this.categories = this.aiModelService.listeCategories();

    this.currentAIModel = this.aiModelService.consulterAIModel(
      this.activatedRoute.snapshot.params['id']);
      this.updatedCatId=this.currentAIModel.OpenState.idstate;

    console.log(this.currentAIModel);
  }
updateAIModel()
{ //console.log(this.currentAIModel);
  this.currentAIModel.OpenState=this.aiModelService.consulterCategorie(this.updatedCatId);

this.aiModelService.updateAIModel(this.currentAIModel);
this.router.navigate(['aiModels']);

}
}
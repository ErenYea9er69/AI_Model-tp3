import { Routes } from '@angular/router';
import { AIModels } from './ai-models/ai-models';
import { AddAIModelComponent } from './add-ai-model/add-ai-model';
import { UpdateAIModel } from './update-ai-model/update-ai-model';
import { RechercheParCategorie } from './recherche-par-state/recherche-par-state';


export const routes: Routes = [
    {path: "aiModels", component : AIModels},
    {path: "add-ai-model", component : AddAIModelComponent},
    {path: "updateAIModel/:id", component: UpdateAIModel},
    {path: "rechercheParCategorie", component: RechercheParCategorie },
    {path: "", redirectTo: "aiModels", pathMatch: "full"}
];
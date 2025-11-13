import { Routes } from '@angular/router';
import { AIModels } from './ai-models/ai-models';
import { AddAIModelComponent } from './add-ai-model/add-ai-model';
import { UpdateAIModel } from './update-ai-model/update-ai-model';
import { RechercheParState } from './recherche-par-state/recherche-par-state';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { aimodelGuard } from './aimodel-guard';
import { ListeOpenStates } from './liste-openstates/liste-openstates';

export const routes: Routes = [
    {path: "aiModels", component : AIModels},
    {path: "add-ai-model", component : AddAIModelComponent, canActivate: [aimodelGuard]},
    {path: "updateAIModel/:id", component: UpdateAIModel},
    {path: "rechercheParOpenstate", component: RechercheParState },
    {path: "rechercheParNom", component : RechercheParNom},
    {path: 'login', component: Login},
    {path: 'app-forbidden', component: Forbidden},
    {path: "liste-openstates", component: ListeOpenStates, canActivate: [aimodelGuard]},


    {path: "", redirectTo: "aiModels", pathMatch: "full"}
];
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AIModel } from '../model/ai.model';
import { AICategory } from "../model/AICategory.model";
import { AICategoryWrapper } from '../model/AICategoryWrapper.model';
import { AuthService } from './auth';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AIModelService {
  apiURL: string = environment.apiURL;
  apiURLCat: string = 'http://localhost:8080/aimodels/cat';

  constructor(private http : HttpClient, private authService: AuthService) { }

  listeAIModels(): Observable<AIModel[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<AIModel[]>(this.apiURL + "/all", { headers: httpHeaders });
  }

  ajouterAIModel(model: AIModel): Observable<AIModel> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<AIModel>(this.apiURL + "/addprod", model, { headers: httpHeaders });
  }

  supprimerAIModel(id: number) {
    const url = `${this.apiURL}/delprod/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterAIModel(id: number): Observable<AIModel> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<AIModel>(url, { headers: httpHeaders });
  }

  updateAIModel(model: AIModel): Observable<AIModel> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<AIModel>(this.apiURL + "/updateprod", model, { headers: httpHeaders });
  }

  listeCategories(): Observable<AICategoryWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<AICategoryWrapper>(this.apiURLCat, { headers: httpHeaders });
  }

  rechercherParCategorie(idCat: number): Observable<AIModel[]> {
    const url = `${this.apiURL}/prodscat/${idCat}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<AIModel[]>(url, { headers: httpHeaders });
  }

  rechercherParNom(nom: string): Observable<AIModel[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<AIModel[]>(url, { headers: httpHeaders });
  }

  ajouterCategorie(cat: AICategory): Observable<AICategory> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<AICategory>(this.apiURLCat, cat, { headers: httpHeaders });
  }
}
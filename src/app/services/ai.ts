import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AIModel } from '../model/ai.model';
import { AICategory } from "../model/AICategory.model";
import { AICategoryWrapper } from '../model/AICategoryWrapper.model';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root',
})
export class AIModelService {
  apiURL: string = environment.apiURL;
  apiURLCat: string = 'http://localhost:8080/aimodels/cat';

  constructor(private http : HttpClient) { }

  listeAIModels(): Observable<AIModel[]> {
    return this.http.get<AIModel[]>(this.apiURL);
  }

  ajouterAIModel(model: AIModel): Observable<AIModel> {
    return this.http.post<AIModel>(this.apiURL, model, httpOptions);
  }

  supprimerAIModel(id : number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterAIModel(id: number): Observable<AIModel> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<AIModel>(url);
  }

  updateAIModel(model: AIModel): Observable<AIModel> {
    return this.http.put<AIModel>(this.apiURL, model, httpOptions);
  }

  listeCategories(): Observable<AICategoryWrapper> { // Now returning the wrapper
    return this.http.get<AICategoryWrapper>(this.apiURLCat);
  }

  rechercherParCategorie(idCat: number): Observable<AIModel[]> {
    const url = `${this.apiURL}/aimodelscat/${idCat}`;
    return this.http.get<AIModel[]>(url);
  }

  rechercherParNom(nom: string): Observable<AIModel[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    return this.http.get<AIModel[]>(url);
  }
}
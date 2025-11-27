import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AIModel } from '../model/ai.model';
import { OpenState } from '../model/OpenState.model';
import { OpenStateWrapper } from '../model/openstate-wrapper.model';

@Injectable({
  providedIn: 'root',
})
export class AIModelService {
  private apiURL: string = 'http://localhost:8080/Aimodels';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };
  
  constructor(private http: HttpClient) {}

  // ==================== AI Models (Custom Controller) ====================

  listeAIModels(): Observable<AIModel[]> {
    return this.http.get<AIModel[]>(`${this.apiURL}/ai-models/api`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  consulterAIModel(id: number): Observable<AIModel> {
    return this.http.get<AIModel>(`${this.apiURL}/ai-models/api/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  ajouterAIModel(model: AIModel): Observable<AIModel> {
    return this.http.post<AIModel>(`${this.apiURL}/ai-models/api`, model, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAIModel(model: AIModel): Observable<AIModel> {
    return this.http.put<AIModel>(`${this.apiURL}/ai-models/api`, model, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  supprimerAIModel(model: AIModel): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/ai-models/api/${model.idModel}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  rechercherParCategorie(idState: number): Observable<AIModel[]> {
    return this.http.get<AIModel[]>(`${this.apiURL}/ai-models/api/modelsstate/${idState}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // ==================== OpenStates (Spring Data REST) ====================

  listestate(): Observable<OpenState[]> {
    return this.http.get<OpenStateWrapper>(`${this.apiURL}/openStates`, this.httpOptions)
      .pipe(
        map(wrapper => {
          console.log('OpenState wrapper response:', wrapper);
          return wrapper._embedded?.openStates || [];
        }),
        catchError(this.handleError)
      );
  }

  consulterCategorie(id: number): Observable<OpenState> {
    return this.http.get<OpenState>(`${this.apiURL}/openStates/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  ajouterOpenState(state: OpenState): Observable<OpenState> {
    return this.http.post<OpenState>(`${this.apiURL}/openStates`, state, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateOpenState(state: OpenState): Observable<OpenState> {
    return this.http.put<OpenState>(`${this.apiURL}/openStates/${state.idstate}`, state, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  supprimerOpenState(state: OpenState): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/openStates/${state.idstate}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('HTTP Error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
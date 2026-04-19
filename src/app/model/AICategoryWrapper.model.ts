import { AICategory } from './AICategory.model';

export class AICategoryWrapper {
  _embedded!: { categories: AICategory[] };
}

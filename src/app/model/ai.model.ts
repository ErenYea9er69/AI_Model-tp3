import { OpenState } from "./OpenState.model";

export class AIModel {
  idModel?: number;
  name?: string;
  version?: string;
  trainingDate?: Date;
  email?: string;
  accuracy?: number;
  openstate!: OpenState; // Changed from OpenState to openstate

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
import { OpenState } from "./OpenState.model";

export class AIModel {
  idModel?: number;
  name?: string;
  version?: string;
  trainingDate?: Date;
  email?: string;
  accuracy?: number;
  OpenState! : OpenState;
}

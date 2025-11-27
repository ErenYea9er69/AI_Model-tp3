import { OpenState } from "./OpenState.model";

export class OpenStateWrapper {
  _embedded!: { openStates: OpenState[] };
}
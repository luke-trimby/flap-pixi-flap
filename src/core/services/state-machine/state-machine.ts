import { AbstractService } from "../../data/abstract/abstract-service";
import { State } from "./state";
import { StateTransition } from "./state-transition";

export class StateService extends AbstractService {
    protected states: Map<string, State>;
    protected transitions: Map<string, StateTransition>;
    protected currentState: State;

    constructor() {
        super();
        this.states = new Map();
        this.transitions = new Map();
    }

    public init(): void {
        // TODO - initialise registered states
    }

    public getState(name: string): State {
        return this.states.get(name);
    }

    public addState(state: State, initState: boolean = false): StateService {
        this.states.set(state.getName(), state);
        if (initState) {
            this.currentState = this.states.get(state.getName());
        }
        return this;
    }
}

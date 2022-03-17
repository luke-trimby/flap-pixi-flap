import { Log } from "enhance-log";
import { Services } from "../services";
import { StateMachineService } from "./state-machine-service";

export class State {
    protected stateName: string;
    protected stateIsInit: boolean;

    constructor(name: string, isInit: boolean = false) {
        this.stateName = name;
        this.stateIsInit = isInit;
    }
    
    public get name(): string {
        return this.stateName;
    }
    
    public get isInit(): boolean {
        return this.stateIsInit;
    }

    public onEnter(): Promise<any> {
        return new Promise((resolve: (reason?: any) => void) => resolve());
    }

    public onExit(): Promise<any> {
        return new Promise((resolve: (reason?: any) => void) => resolve());
    }

    protected complete(): void {
        Services.get(StateMachineService).complete();
    }
}

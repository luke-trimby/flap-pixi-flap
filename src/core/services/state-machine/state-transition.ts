
export class StateTransition {
    protected fromStateName: string;
    protected toStateName: string;
    protected count: number;

    constructor(fromStateName: string, toStateName: string, count: number = Infinity) {
        this.fromStateName = fromStateName;
        this.toStateName = toStateName;
        this.count = count;
    }

    public getFromStateName(): string {
        return this.fromStateName;
    }
    
    public getToStateName(): string {
        return this.toStateName;
    }
    
    public getCount(): number {
        return this.count;
    }
}
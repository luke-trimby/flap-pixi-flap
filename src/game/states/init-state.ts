import { Log } from "enhance-log";
import { State } from "../../core/services/state-machine/state";

export class InitState extends State {

    public onEnter(): Promise<any> {
        return new Promise((resolve, reject) => {
            Log.d(`[InitState] ${this.name}.onEnter`);
        });
    }
}
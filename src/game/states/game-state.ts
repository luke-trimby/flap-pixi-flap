import { Log } from "enhance-log";
import { State } from "../../core/services/state-machine/state";

export class GameState extends State {

    public onEnter(): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any, reject: (value?: any) => any) => {
            Log.i(`Lukas - GameState.onEnter()`);
        });
    }
}
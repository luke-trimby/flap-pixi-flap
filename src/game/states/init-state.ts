import { Components } from "../../core/components/components";
import { PreloaderComponent } from "../../core/components/preloader/preloader-component";
import { State } from "../../core/services/state-machine/state";
import { FlapBackgroundComponent } from "../components/flap-background-component";

export class InitState extends State {

    public onEnter(): Promise<any> {
        return new Promise((resolve: (value?: any) => any, reject: (value?: any) => any) => {
            Components.get(PreloaderComponent).hidePreloader();
            Components.get(FlapBackgroundComponent).create();
            resolve();
        }).then(() => this.complete());
    }
}
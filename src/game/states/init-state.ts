import { Components } from "../../core/components/components";
import { PreloaderComponent } from "../../core/components/preloader/preloader-component";
import { State } from "../../core/services/state-machine/state";
import { PromiseWrap } from "../../core/utils/promise-utils";
import { FlapBackgroundComponent } from "../components/flap-background-component";

export class InitState extends State {

    public onEnter(): Promise<any> {
        return PromiseWrap(() => {
            Components.get(PreloaderComponent).hidePreloader();
            Components.get(FlapBackgroundComponent).create();
        }).then(() => this.complete());
    }
}
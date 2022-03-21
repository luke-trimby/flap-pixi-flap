import { Components } from "../../core/components/components";
import { PreloaderComponent } from "../../core/components/preloader/preloader-component";
import { State } from "../../core/services/state-machine/state";
import { PromiseWrap } from "../../core/utils/promise-utils";
import { FlapBackgroundComponent } from "../components/flap-background-component";
import { FlapColumnComponent } from "../components/flap-column-component";
import { FlapMenuComponent } from "../components/flap-menu-component";
import { FlapScoreComponent } from "../components/flap-score-component";

export class InitState extends State {

    protected preloaderComponent: PreloaderComponent;
    protected menuComponent: FlapMenuComponent;
    protected scoreComponent: FlapScoreComponent;
    protected backgroundComponent: FlapBackgroundComponent;
    protected columnComponent: FlapColumnComponent;

    constructor(name: string, init: boolean = false) {
        super(name, init);
        this.preloaderComponent = Components.get(PreloaderComponent);
        this.menuComponent = Components.get(FlapMenuComponent);
        this.scoreComponent = Components.get(FlapScoreComponent);
        this.backgroundComponent = Components.get(FlapBackgroundComponent);
        this.columnComponent = Components.get(FlapColumnComponent);
    }

    public onEnter(): Promise<any> {
        return PromiseWrap(() => {
            this.preloaderComponent.hidePreloader();
            this.backgroundComponent.create();
            this.columnComponent.create();
            this.menuComponent.create();
            this.menuComponent.show(false);
            this.menuComponent.setInteractionEnabled(false);
            this.scoreComponent.create();
        }).then(() => this.complete());
    }
}
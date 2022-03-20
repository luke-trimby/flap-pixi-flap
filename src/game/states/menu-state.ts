import gsap from "gsap";
import { Container } from "pixi.js";
import { Components } from "../../core/components/components";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { State } from "../../core/services/state-machine/state";
import { FlapMenuComponent } from "../components/flap-menu-component";

export class MenuState extends State {

    public onEnter(): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any, reject: (value?: any) => any) => {
            const menu: FlapMenuComponent = Components.get(FlapMenuComponent)
            menu.create();
            menu.onPlayButtonPressed.addOnce(() => this.onPlayButtonPressed());
            resolve();
        });
    }

    protected onPlayButtonPressed(): void {
        const layerService: LayerService = Services.get(LayerService);
        const menuLayer: Container = layerService.getLayer("menu");
        gsap.to(menuLayer, {
            alpha: 0, duration: 0.5,
            onComplete: () => menuLayer.removeChildren()
        });
        this.complete();
    }
}
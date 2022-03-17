import { Components } from "../components/components";
import { PreloaderComponent } from "../components/preloader/preloader-component";
import { AbstractCoreSetup } from "../data/abstract/abstract-core-setup";
import { ICanvasProperties } from "../data/interface/canvas-properties";
import { Size } from "../data/size";
import { AssetService } from "../services/asset/asset-service";
import { CanvasService } from "../services/canvas/canvas-service";
import { LayerService } from "../services/layer/layer-service";
import { PreloaderSerice } from "../services/preloader/preloader-service";
import { Services } from "../services/services";
import { StateMachineService } from "../services/state-machine/state-machine-service";

export class CoreSetup extends AbstractCoreSetup {

    public registerServices(): void {
        const canvasProps: ICanvasProperties = {
            size: new Size(540, 920),
            canvasColor: 0x000000,
            centered: true,
            canvasContainer: "canvas-layer-container",
            htmlContainer: "html-layer-container"
        };
        Services.register(new CanvasService(canvasProps));
        Services.register(new AssetService());
        Services.register(new PreloaderSerice());
        Services.register(new LayerService());
        Services.register(new StateMachineService());
    }

    public registerAssets(): void {
        Services.get(PreloaderSerice).addLoadingStages(
            {
                name: "PreloaderAssets",
                assets: [
                    { name: "logo",  path: "./assets/images/logo.png" }
                ]
            }
        );
    }

    public registerSounds(): void {
        // ..
    }

    public registerStates(): void {
        // ..
    }

    public registerLayers(): void {
        // ..
    }

    public registerComponents(): void {
        Components.register(new PreloaderComponent());
    }
}
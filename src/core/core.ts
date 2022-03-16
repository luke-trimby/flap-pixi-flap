import { CanvasService } from "./services/canvas/canvas-service";
import { PreloaderSerice } from "./services/preloader/preloader-service";
import { Services } from "./services/services";
import { CoreSetup } from "./setup/core-setup";

export class Core {

    public init(...setupClasses: CoreSetup[]): void {

        setupClasses.map((setup: CoreSetup) => setup.registerServices());
        Services.init();

        setupClasses.map((setup: CoreSetup) => setup.registerAssets());
        Services.get(PreloaderSerice).load();

        setupClasses.map((setup: CoreSetup) => setup.registerSounds());
        setupClasses.map((setup: CoreSetup) => setup.registerStates());


        Services.get(CanvasService)?.registerForUpdates(() => this.update());
    }

    protected update(): void {
        // ..
    }
}
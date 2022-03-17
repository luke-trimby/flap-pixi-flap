import { Log } from "enhance-log";
import { Components } from "./components/components";
import { CanvasService } from "./services/canvas/canvas-service";
import { PreloaderSerice } from "./services/preloader/preloader-service";
import { Services } from "./services/services";
import { StateMachineService } from "./services/state-machine/state-machine-service";
import { CoreSetup } from "./setup/core-setup";

export class Core {

    public init(...setupClasses: CoreSetup[]): void {

        Log.w(`[Core] initialising Services`);
        setupClasses.forEach((setup: CoreSetup) => setup.registerServices());
        Services.init();
        Log.w(`[Core] initialising Assets`);
        setupClasses.forEach((setup: CoreSetup) => setup.registerAssets());
        Services.get(PreloaderSerice).load();
        Log.w(`[Core] initialising Audio`);
        setupClasses.forEach((setup: CoreSetup) => setup.registerSounds());
        Log.w(`[Core] initialising Layers`);
        setupClasses.forEach((setup: CoreSetup) => setup.registerLayers());
        Log.w(`[Core] initialising Components`);
        setupClasses.forEach((setup: CoreSetup) => setup.registerComponents());
        Components.init();
        Log.w(`[Core] initialising States`);
        setupClasses.forEach((setup: CoreSetup) => setup.registerStates());
        
        Services.get(CanvasService)?.registerForUpdates(() => this.update());

        Services.get(PreloaderSerice).onAllStagesLoaded.addOnce(() => Services.get(StateMachineService).start());
    }

    protected update(): void {
        // ..
    }
}
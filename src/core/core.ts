import { Log } from "enhance-log";
import { Components } from "./components/components";
import { PreloaderSerice } from "./services/preloader/preloader-service";
import { Services } from "./services/services";
import { StateMachineService } from "./services/state-machine/state-machine-service";
import { CoreSetup } from "./setup/core-setup";

export class Core {

    protected setupClasses: CoreSetup[];

    public init(...setupClasses: CoreSetup[]): void {

        this.setupClasses = setupClasses;
        this.initServices();
        this.initLayers();
        this.initComponents();
        this.initAssets();
        this.initAudio();
        this.initStates();
        /// #if __NODE_ENV__ =="development"
        this.initDebug();
        /// #endif

        Services.get(PreloaderSerice)?.onAllStagesLoaded.addOnce(() => Services.get(StateMachineService).start());
    }

    protected initServices(): void {
        Log.w(`[Core] initialising Services`);
        this.setupClasses.forEach((setup: CoreSetup) => setup.registerServices());
        Services.init();
    }

    protected initLayers(): void {
        Log.w(`[Core] initialising Layers`);
        this.setupClasses.forEach((setup: CoreSetup) => setup.registerLayers());
    }

    protected initComponents(): void {
        Log.w(`[Core] initialising Components`);
        this.setupClasses.forEach((setup: CoreSetup) => setup.registerComponents());
        Components.init();
    }

    protected initAssets(): void {
        Log.w(`[Core] initialising Assets`);
        this.setupClasses.forEach((setup: CoreSetup) => setup.registerAssets());
        Services.get(PreloaderSerice).load();
    }

    protected initAudio(): void {
        Log.w(`[Core] initialising Audio`);
        this.setupClasses.forEach((setup: CoreSetup) => setup.registerAudio());
    }

    protected initStates(): void {
        Log.w(`[Core] initialising States`);
        this.setupClasses.forEach((setup: CoreSetup) => setup.registerStates());
    }

    /// #if __NODE_ENV__ =="development"
    protected initDebug(): void {
        Log.w(`[Core] initialising Debug`);
        this.setupClasses.forEach((setup: CoreSetup) => setup.registerDebug());
    }
    /// #endif
}
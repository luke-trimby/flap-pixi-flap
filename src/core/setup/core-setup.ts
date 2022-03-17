import { Components } from "../components/components";
import { PreloaderComponent } from "../components/preloader/preloader-component";
import { AbstractCoreSetup } from "../data/abstract/abstract-core-setup";
import { ICanvasProperties } from "../data/interface/canvas-properties";
import { Size } from "../data/size";
import { CanvasService } from "../services/canvas/canvas-service";
import { PreloaderSerice } from "../services/preloader/preloader-service";
import { Services } from "../services/services";
import { Decision } from "../services/state-machine/decision";
import { StateMachineService } from "../services/state-machine/state-machine-service";
import { InitState } from "../states/init-state";

export class CoreSetup extends AbstractCoreSetup {

    public registerServices(): void {
        const canvasProps: ICanvasProperties = {
            size: new Size(520, 960),
            canvasColor: 0x000000,
            centered: true,
            canvasContainer: "canvas-layer-container",
            htmlContainer: "html-layer-container"
        };
        Services.register(new CanvasService(canvasProps));
        Services.register(new PreloaderSerice());
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
        const stateMachine: StateMachineService = Services.get(StateMachineService);

        stateMachine
            .addState(new InitState("init", true))
            .addState(new InitState("first-state"))
            .addState(new InitState("second-state"))
            .addState(new InitState("third-state"))
            .addState(new InitState("fourth-state"))
            .addState(new InitState("fifth-state"))

        stateMachine
            .addDecision(new Decision("first-decision", "second-decision"))
            .addDecision(new Decision("second-decision", "third-decision"))
            .addDecision(new Decision("third-decision", "fourth-decision"))
            .addDecision(new Decision("fourth-decision", "fifth-decision"))
            .addDecision(new Decision("fifth-decision", "third-state"))

        stateMachine
            .mapTransition("init", "first-state")
            .mapTransition("first-state", "second-state")
            .mapTransition("second-state", "first-decision")
            .mapTransition("third-state", "fourth-state")
            .mapTransition("fourth-state", "fifth-state")
    }

    public registerLayers(): void {
        // ..
    }

    public registerComponents(): void {
        Components.register(new PreloaderComponent());
    }
}
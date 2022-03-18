import { Components } from "../../core/components/components";
import { LayerService } from "../../core/services/layer/layer-service";
import { PreloaderSerice } from "../../core/services/preloader/preloader-service";
import { Services } from "../../core/services/services";
import { StateMachineService } from "../../core/services/state-machine/state-machine-service";
import { CoreSetup } from "../../core/setup/core-setup";
import { FlapBackgroundComponent } from "../components/flap-background-component";
import { FlapPreloaderComponent } from "../components/flap-preloader-component";
import { InitState } from "../states/init-state";

export class FlapSetup extends CoreSetup {

    public registerComponents(): void {
        super.registerComponents();
        Components.register(new FlapPreloaderComponent());
        Components.register(new FlapBackgroundComponent());
    }

    public registerAssets(): void {
        super.registerAssets();

        Services.get(PreloaderSerice).addLoadingStages(
            {
                name: "GameAssets",
                assets: [
                    { name: "WorldAssets",  path: "./assets/atlas/WorldAssets.json" },
                    { name: "playButton",  path: "./assets/images/playButton.png" },
                    { name: "flyingPixie",  path: "./assets/images/flyingPixie.png" },
                    { name: "column",  path: "./assets/images/column.png" },
                    { name: "github",  path: "./assets/images/github.png" }
                ]
            }
        );
    }

    public registerLayers(): void {
        Services.get(LayerService).registerLayers(
            { name: "bg-0" },
            { name: "bg-1" },
            { name: "bg-2" },
            { name: "bg-3" },
            { name: "bg-4" },
            { name: "bg-5" },
            { name: "bg-6" },
            { name: "bg-7" },
            { name: "preloader-layer" }
        );
    }

    public registerStates(): void {
        const stateMachine: StateMachineService = Services.get(StateMachineService);

        stateMachine
            .addState(new InitState("init", true))
    }
}
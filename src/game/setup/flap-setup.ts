import { Components } from "../../core/components/components";
import { LayerService } from "../../core/services/layer/layer-service";
import { PreloaderSerice } from "../../core/services/preloader/preloader-service";
import { Services } from "../../core/services/services";
import { StateMachineService } from "../../core/services/state-machine/state-machine-service";
import { CoreSetup } from "../../core/setup/core-setup";
import { FlapBackgroundComponent } from "../components/flap-background-component";
import { FlapMenuComponent } from "../components/flap-menu-component";
import { FlapPixiComponent } from "../components/flap-pixi-component";
import { FlapPreloaderComponent } from "../components/flap-preloader-component";
import { GameIntroState } from "../states/game-intro-state";
import { GameState } from "../states/game-state";
import { InitState } from "../states/init-state";
import { MenuState } from "../states/menu-state";

export class FlapSetup extends CoreSetup {

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
            { name: "pixi" },
            { name: "game-intro" },
            { name: "menu" },
            { name: "preloader-layer" }
        );
    }

    public registerComponents(): void {
        super.registerComponents();
        Components.register(new FlapPreloaderComponent());
        Components.register(new FlapBackgroundComponent());
        Components.register(new FlapMenuComponent());
        Components.register(new FlapPixiComponent());
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
                ],
                fonts: [
                    "FredokaOne"
                ]
            }
        );
    }

    public registerStates(): void {
        const stateMachine: StateMachineService = Services.get(StateMachineService);

        stateMachine
            .addState(new InitState("init", true))
            .addState(new MenuState("menu"))
            .addState(new GameIntroState("game-intro"))
            .addState(new GameState("game"))

        stateMachine
            .mapTransition("init", "menu")
            .mapTransition("menu", "game-intro")
            .mapTransition("game-intro", "game")
    }
}
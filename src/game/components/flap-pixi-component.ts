import gsap, { Power4 } from "gsap";
import { Container, Graphics, Point, Rectangle, Sprite } from "pixi.js";
import { Signal } from "signals";
import { Components } from "../../core/components/components";
import { AbstractComponent } from "../../core/data/abstract/abstract-component";
import { AssetService } from "../../core/services/asset/asset-service";
import { CanvasService } from "../../core/services/canvas/canvas-service";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { PromiseWrap } from "../../core/utils/promise-utils";
import { FlapColumnComponent } from "./flap-column-component";

export class FlapPixiComponent extends AbstractComponent {

    public onPixiDeath: Signal;
    protected layer: Container;
    protected pixi: Sprite;
    protected flapButton: Graphics;
    protected floorHitArea: Rectangle;
    protected gravity: number;
    protected userInteractionEnabled: boolean;
    protected pixiMutators: Point[];
    protected pixiUpperLimit: number;
    protected pixiReset: NodeJS.Timeout;
    protected flapDistance: number;
    protected flapRotation: number;
    protected flapRotationTimeout: number;

    public init(): void {
        this.onPixiDeath = new Signal();
        this.layer = Services.get(LayerService).getLayer("pixi");
        this.userInteractionEnabled = false;
        this.pixiMutators = [];
        this.pixiUpperLimit = 120;
        this.gravity = 4;
        this.flapDistance = -16;
        this.flapRotation = -0.4;
        this.flapRotationTimeout = 60;
    }

    public create(): void {
        this.pixi = Services.get(AssetService).createSprite("flyingPixie");
        this.pixi.anchor.set(0.1, 0.5);
        this.pixi.position.set(-100, 460);
        this.layer.addChild(this.pixi);

        this.flapButton = new Graphics();
        this.flapButton.beginFill(0x00ff00, 0.5);
        this.flapButton.drawRect(0, 0, 540, 920);
        this.flapButton.endFill();
        this.flapButton.alpha = 0;
        this.layer.addChild(this.flapButton);

        this.floorHitArea = new Rectangle(0, 735, 540, 185);

        Services.get(CanvasService).registerForUpdates(this.onUpdate, this);
        Components.get(FlapColumnComponent).onPixiDeath.addOnce(() => this.handleDeath());
    }

    public playIntro(): Promise<any> {
        return PromiseWrap(() => {
            gsap.to(this.pixi, {
                x: 250,
                duration: 1.2,
                onComplete: () => {
                    this.flapButton.buttonMode = true;
                    this.flapButton.interactive = true;
                    this.flapButton.on("pointerdown", () => this.onFlapButtonPressed());
                }
            });
        });
    }

    public getPixiSprite(): Sprite {
        return this.pixi;
    }

    protected playDeathAnim(): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any) => {
            gsap.timeline()
            .to(this.pixi, {
                y: "-=100",
                duration: 0.25,
                delay: 0.25,
                rotation: Math.pow(Math.PI, 2)
            })
            .to(this.pixi, {
                y: 1000,
                duration: 0.5,
                ease: Power4.easeIn,
                onComplete: () => resolve()
            });
        });
    }

    public enableUserInteraction(enable: boolean = true): void {
        this.userInteractionEnabled = enable;
        this.flapButton.buttonMode = enable;
        this.flapButton.interactive = enable;
    }

    protected onFlapButtonPressed(): void {
        if (this.userInteractionEnabled) {
            if (this.pixi.y >= this.pixiUpperLimit) {
                this.pixi.rotation = this.flapRotation;
                clearTimeout(this.pixiReset);
                this.pixiReset = setTimeout(() => this.pixi.rotation = 0, this.flapRotationTimeout);

                const mutator: Point = new Point(0, this.flapDistance * devicePixelRatio);
                this.pixiMutators.push(mutator);
                gsap.to(mutator, {
                    duration: 0.5, y: 0, ease: Power4.easeOut,
                    onComplete: () => this.pixiMutators.splice(this.pixiMutators.indexOf(mutator), 1)
                });
            }
        }
    }

    protected onUpdate(): void {
        if (this.userInteractionEnabled) {
            this.pixiMutators.forEach((mutator: Point) => {
                this.pixi.position.x += mutator.x;
                this.pixi.position.y += mutator.y;
            });
            this.pixi.y += this.gravity * devicePixelRatio;
        }
        if (this.floorHitArea.contains(this.pixi.x, this.pixi.y)) {
            this.handleDeath();
        }
    }

    protected handleDeath(): void {
        this.enableUserInteraction(false);
        Services.get(CanvasService).deRegisterFromUpdates(this.onUpdate, this);

        this.floorHitArea = null;
        this.playDeathAnim().then(() => this.layer.removeChildren());
        this.onPixiDeath.dispatch();
    }
}
import gsap, { Power4 } from "gsap";
import { Container, Graphics, Point, Polygon, SCALE_MODES } from "pixi.js";
import { Signal } from "signals";
import { CollisionPoly } from "../../core/collision/collision-poly";
import { Components } from "../../core/components/components";
import { AbstractComponent } from "../../core/data/abstract/abstract-component";
import { PolySprite } from "../../core/graphics/poly-sprite";
import { AssetService } from "../../core/services/asset/asset-service";
import { CanvasService } from "../../core/services/canvas/canvas-service";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { PromiseWrap } from "../../core/utils/promise-utils";
import { floorPolyPoints } from "../data/config/flap-floor-poly-points";
import { pixiPolyPoints } from "../data/config/flap-pixi-poly-points";
import { FlapColumnComponent } from "./flap-column-component";

export class FlapPixiComponent extends AbstractComponent {
    public onPixiDeath: Signal;
    protected canvasService: CanvasService;
    protected layer: Container;
    protected pixi: PolySprite;
    protected flapButton: Graphics;
    protected floor: PolySprite;
    protected gravity: number;
    protected userInteractionEnabled: boolean;
    protected pixiMutators: Point[];
    protected pixiUpperLimit: number;
    protected pixiReset: NodeJS.Timeout;
    protected flapDistance: number;
    protected flapRotation: number;
    protected flapRotationTimeout: number;
    protected flapGlide: number = 0.75;

    public init(): void {
        this.onPixiDeath = new Signal();
        this.canvasService = Services.get(CanvasService);
        this.layer = Services.get(LayerService).getLayer("pixi");
        this.userInteractionEnabled = false;
        this.pixiMutators = [];
        this.pixiUpperLimit = 120;
        this.gravity = 4;
        this.flapDistance = -16;
        this.flapRotation = -0.5;
        this.flapRotationTimeout = 60;
    }

    public create(): void {
        this.pixi = Services.get(AssetService).createSprite("flyingPixie");
        this.pixi.anchor.set(0.1, 0.5);
        this.pixi.position.set(-100, 460);
        this.pixi.hitArea = new Polygon(pixiPolyPoints);
        this.pixi.collisionPoly = new CollisionPoly(this.pixi, pixiPolyPoints);
        this.layer.addChild(this.pixi);

        this.flapButton = new Graphics();
        this.flapButton.beginFill(0x00ff00, 0.5);
        this.flapButton.drawRect(0, 0, 540, 920);
        this.flapButton.endFill();
        this.flapButton.alpha = 0;
        this.layer.addChild(this.flapButton);

        const gFloor = new Graphics().beginFill(0xffffff, 0).drawPolygon(floorPolyPoints).endFill();
        const tFloor = Services.get(CanvasService).renderer.generateTexture(gFloor, SCALE_MODES.LINEAR, 1);
        this.floor = new PolySprite(tFloor);
        this.floor.collisionPoly = new CollisionPoly(this.floor, floorPolyPoints);
        this.floor.position.set(0, 765);
        this.layer.addChild(this.floor);

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

    public getPixiSprite(): PolySprite {
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
                    duration: this.flapGlide, y: 0, ease: Power4.easeOut,
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

            this.pixi.update();
            this.floor.update();

            if (this.floor.collisionPoly.intersectsBounds(this.pixi.collisionPoly)) {
                this.handleDeath();
            }
        }
    }

    protected handleDeath(): void {
        this.enableUserInteraction(false);
        Services.get(CanvasService).deRegisterFromUpdates(this.onUpdate, this);

        this.playDeathAnim().then(() => this.layer.removeChildren());
        this.onPixiDeath.dispatch();
    }
}
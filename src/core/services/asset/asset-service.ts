import { Log } from "enhance-log";
import { LoaderResource, Sprite, Texture } from "pixi.js";
import { AbstractService } from "../../data/abstract/abstract-service";

export class AssetService extends AbstractService {

    protected resources: Map<string, LoaderResource>;

    public init(): void {
        Log.d(`[AssetService] Initialising`);
        this.resources = new Map();
    }

    public getTexture(name: string): Texture {
        return this.getResource(name)?.texture;
    }

    public getResource(name: string): LoaderResource {
        return this.resources.get(name);
    }

    public addResources(resources: LoaderResource[]) : void {
        for (const name in resources) {
            if (resources[name]) {
                this.resources.set(name, resources[name])
            }
        }
    }

    public createSprite(name: string, atlas?: string): Sprite {
        if (atlas) {
            return this.createSpriteFromAtlas(name, atlas);
        }
        return this.createSpriteFromTexture(name);
    }

    protected createSpriteFromTexture(name: string): PIXI.Sprite {
        const texture: Texture = this.getTexture(name);
        let sprite: Sprite;
        if (texture) {
            sprite = new Sprite(texture);
        }
        return sprite;
    }

    protected createSpriteFromAtlas(frameName: string, atlas: string): PIXI.Sprite {
        const texture: Texture = this.getResource(atlas).textures[frameName];
        let sprite: Sprite;
        if (texture) {
            sprite = new Sprite(texture);
        }
        return sprite;
    }
}
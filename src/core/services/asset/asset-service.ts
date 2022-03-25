import { Log } from "enhance-log";
import { LoaderResource, Sprite, Texture } from "pixi.js";
import { AbstractService } from "../../data/abstract/abstract-service";
import { PolySprite } from "../../graphics/poly-sprite";

export class AssetService extends AbstractService {

    protected resources: Map<string, LoaderResource>;

    public init(): void {
        Log.d(`[AssetService] Initialising`);
        this.resources = new Map();
    }

    public getResource(name: string): LoaderResource {
        return this.resources.get(name);
    }

    public getTexture(name: string): Texture {
        return this.getResource(name).texture;
    }

    public getTextureFromAtlas(frameName: string, atlas: string): Texture {
        return this.getResource(atlas).textures[frameName];
    }

    public addResources(resources: LoaderResource[]) : void {
        for (const name in resources) {
            if (resources[name]) {
                this.resources.set(name, resources[name])
            }
        }
    }

    public createSprite(name: string, atlas?: string): PolySprite {
        if (atlas) {
            return this.createSpriteFromAtlas(name, atlas);
        }
        return this.createSpriteFromTexture(name);
    }

    protected createSpriteFromTexture(name: string): PolySprite {
        const texture: Texture = this.getTexture(name);
        let sprite: PolySprite;
        if (texture) {
            sprite = new PolySprite(texture);
        }
        return sprite;
    }

    protected createSpriteFromAtlas(frameName: string, atlas: string): PolySprite {
        const texture: Texture = this.getTextureFromAtlas(frameName, atlas);
        let sprite: PolySprite;
        if (texture) {
            sprite = new PolySprite(texture);
        }
        return sprite;
    }
}
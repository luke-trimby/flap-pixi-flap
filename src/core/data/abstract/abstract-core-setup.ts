
export abstract class AbstractCoreSetup {
    public abstract registerServices(): void;
    public abstract registerStates(): void;
    public abstract registerAssets(): void;
    public abstract registerSounds(): void;
}
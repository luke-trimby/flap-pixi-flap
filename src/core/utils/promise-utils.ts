import gsap from "gsap";

export function PromiseChain(promiseList: Array<() => Promise<any>>): Promise<any> {
    return promiseList.reduce((prevPromise: Promise<any>, nextPromise: () => Promise<any>) => {
        return prevPromise.then((chainResults: any[]) => {
            return nextPromise().then((currentResult: any) => {
                return [ ...chainResults, currentResult ];
            });
        });
    }, Promise.resolve([]));
}

export function PromiseWrap<T>(func: () => T): Promise<T> {
    return new Promise<any>((resolve: (value?: any) => any) => {
        func();
        resolve();
    });
}

export function PromiseDelay<T>(delay: number): Promise<T> {
    return new Promise((resolve: (value?: any) => any) => {
        gsap.delayedCall(delay, () => resolve());
    })
}
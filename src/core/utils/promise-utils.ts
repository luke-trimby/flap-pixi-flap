
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
    return new Promise<any>((resolve: (value?: any) => any, reject: (value?: any) => any) => {
        func();
        resolve();
    });
}
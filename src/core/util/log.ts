
export class Log {
    static nil: string = "";
    static color = {
        info: '#EEEEEE',
        debug: '#6666FF',
        warn: '#FF6633',
        error: '#FF3333'
    };

    public static i(message: string, ...vars: any[]) {
        Log.o(Log.color.info, message, ...vars);
    }
    public static d(message: string, ...vars: any[]) {
        Log.o(Log.color.debug, message, ...vars);
    }
    public static w(message: string, ...vars: any[]) {
        Log.o(Log.color.warn, message, ...vars);
    }
    public static c(color: string = Log.color.debug, message: string, ...vars: any[]) {
        Log.o(color, message, ...vars);
    }
    public static e(message: string, ...vars: any[]) {
        Log.o(Log.color.error, message, ...vars);
    }
    public static throw(errorCode: number, message: string) {
        throw new Error(errorCode + ": " + message);
    }
    public static o(color: string, message: string, ...vars: any[]) {
        const date = new Date;
        const dateFormated = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) + " " + ("000" + date.getMilliseconds()).slice(-4);
        console.log( "%c" +"[" + dateFormated + "] " + message, "color:" + color + "; font-weight:bold", ...vars);
    }
}
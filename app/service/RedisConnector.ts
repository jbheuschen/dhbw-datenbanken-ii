import Redis from "ioredis";
import {Comment} from "~/service/Comment";

export class RedisConnector {

    private client: Redis;
    private channel: string;

    constructor(channel: string = "chat") {
        this.client = new Redis({
            port: 6379, // Redis port
            host: process.env.REDIS_HOST ?? "127.0.0.1", // Redis host
            username: "default", // needs Redis >= 6
            password: process.env.REDIS_PASSWORD ?? "",
            db: 0, // Defaults to 0
        });
        this.channel = channel;
        this.client.subscribe(this.channel, (err, count) => {
            if(err) {
                console.log(err);
            }
        });
    }

    public sendMessages(message: Comment) {
        this.client.publish(this.channel, JSON.stringify(message));
    }

    public subscribe(callback: (message: Comment) => void) {
        this.client.on("message", (channel, message) => {
            if(channel === this.channel) {
                callback(JSON.parse(message) as Comment);
            }
        })
    }

    public finalize() {
        this.client.unsubscribe();
    }

}

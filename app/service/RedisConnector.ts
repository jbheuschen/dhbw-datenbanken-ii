import Redis from "ioredis";
import {Comment} from "~/service/Comment";

export class RedisConnector {

    private client: Redis;
    private readonly channel: string;

    constructor(channel: string = "chat") {
        this.client = new Redis({
            port: 6379,
            host: process.env.REDIS_HOST ?? "127.0.0.1",
            password: process.env.REDIS_PASSWORD ?? "QXSb8RUvscYn3ZL9Gh4udq",
            db: 0,
        });
        this.channel = channel;
    }

    public async sendMessages(message: Comment) {
        await this.client.publish(this.channel, JSON.stringify(message));
    }

    public async subscribe(callback: (message: Comment) => void) {
        await this.client.subscribe(this.channel, (err, count) => {
            if(err) {
                console.log(err);
            }
        });
        this.client.on("message", (channel, message) => {
            if(channel === this.channel) {
                callback(JSON.parse(message) as Comment);
            }
        });
    }

    public async getMessageHistory(): Promise<Comment[]> {
        // NO IMPLEMENTATION
        return [];
    }

    public finalize() {
        this.client.unsubscribe();
    }

}

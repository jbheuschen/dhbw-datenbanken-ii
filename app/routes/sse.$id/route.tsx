import {LoaderFunctionArgs} from "@remix-run/node";
import {eventStream} from "remix-utils/sse/server";
import {interval} from "remix-utils/timers";
import {RedisConnector} from "~/service/RedisConnector";

export async function loader({ request }: LoaderFunctionArgs) {
    const redis = new RedisConnector();
    return eventStream(request.signal, function setup(send) {
        async function run() {
            await redis.subscribe((msg) => {
                send({ event: "chat", data: JSON.stringify(msg)});
            });
        }

        run();

        return () => {

        }
    });
}

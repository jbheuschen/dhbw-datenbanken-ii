import {Link} from "react-router-dom";
import {ActionFunctionArgs, LoaderFunctionArgs, type MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {RedisConnector} from "~/service/RedisConnector";
import {Comment} from "~/service/Comment";
import PMChat from "~/ui/PMChat";
import {v4} from "uuid";
import {useEventSource} from "remix-utils/sse/react";
import {useEffect, useState} from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "Chat | Redis-Chat" },
    ];
};

export async function action({request, params}: ActionFunctionArgs) {

    const id = params.id ?? "1";
    const rc = new RedisConnector();


    switch(request.method) {
        case "PUT": {
            const body = await request.formData();
            const msg = body.get("message")?.toString() ?? "n/a";
            const mo: Comment = {uid: v4(), message: msg, author: id, date: new Date()};
            await rc.sendMessages(mo);
            return {success: true, message: mo};
        }
        default: {

        }
    }

    return {success: false};
}

export async function loader({request, params}: LoaderFunctionArgs) {

    const id = params.id ?? "1";
    const connector = new RedisConnector();

    const messages: Comment[] = await connector.getMessageHistory();

    return {id, messages};
}

export default function Index() {

    const data = useLoaderData<typeof loader>();

    const [msgs, setMsgs] = useState<Comment[]>(data.messages);

    const sse = useEventSource("/sse/" + data.id, { event: "chat" });

    useEffect(() => {
        if(sse) {
            setMsgs(msgs.concat([JSON.parse(sse) as Comment]));
        }
    }, [sse]);

    return (
        <div className="w-full">
            <PMChat comments={msgs} userId={data.id} />
        </div>
    );
}

import React, {useState} from "react";
import PMChatBubble from "~/ui/PMChatBubble";
import {Send, SendHorizonal} from "lucide-react";
import {useFetcher, useRouteLoaderData} from "@remix-run/react";
import {Comment} from "~/service/Comment";

interface PMChatProps {
    comments: Comment[];
    userId: string;
}

const PMChat = React.memo(({comments, userId}: PMChatProps) => {

    const [writing, setWriting] = useState("");

    const canWrite = true;

    const fetcher = useFetcher();

    /**
     * Sendet eine neue Nachricht über das Formular.
     */
    function send() {
        const fD = new FormData();
        fD.set("message", writing);
        fetcher.submit(fD, {
            method: "PUT",
            action: `/chat/${userId}`
        });
        setWriting("");
    }

    return <>
        <div
            className="flex flex-col bg-white pointer-events-auto max-w-full max-h-full h-full dark:bg-neutral-800">
            <div className="p-4 overflow-y-auto">
                <ul className="space-y-5">
                    {comments.map(c => <PMChatBubble key={c.uid} author={c.author} ownMessage={userId === c.author}
                                                     message={c.message} timestamp={c.date}/>)}
                </ul>
            </div>
            <div
                className="flex justify-end items-center gap-x-2 py-3 px-4 mt-auto border-t dark:border-neutral-700">
                <div className={"w-full"}>
                    <label htmlFor="writing" className="sr-only">Nachricht schreiben</label>
                    <div className="flex rounded-lg shadow-sm">
                        <input type="text" id="writing"
                               name="writing"
                               value={writing}
                               disabled={!canWrite}
                               onChange={e => setWriting(e.target.value)}
                               placeholder={canWrite ? "Nachricht verfassen..." : "Keine Berechtigung zur Chatteilnahme."}
                               className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"/>
                        <button type="button"
                                onClick={send}
                                disabled={writing.trim().length === 0 || !canWrite}
                                className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            <SendHorizonal className={"shrink-0 size-4"}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>;
});

export default PMChat;

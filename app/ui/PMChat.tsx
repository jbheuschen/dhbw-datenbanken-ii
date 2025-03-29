import React, {useState} from "react";
import PMChatBubble from "~/ui/PMChatBubble";
import {Send, SendHorizonal} from "lucide-react";
import {useFetcher, useRouteLoaderData} from "@remix-run/react";
import {Comment} from "~/service/Comment";

interface PMChatProps {
    comments: Comment[];
    userId: string;
    id: string;
}

const PMChat = React.memo(({comments, userId, id}: PMChatProps) => {

    const [writing, setWriting] = useState("");

    const canWrite = true;

    const fetcher = useFetcher();

    /**
     * Sendet eine neue Nachricht über das Formular.
     */
    function send() {
        const fD = new FormData();
        fD.set("content", writing);
        fetcher.submit(fD, {
            method: "PUT",
            action: "/api/comment"
        });
        setWriting("");
    }

    return <>
        <div id={id}
             className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
             role="dialog" tabIndex="-1" aria-labelledby="hs-full-screen-label">
            <div
                className="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 opacity-0 transition-all max-w-full max-h-full h-full">
                <div
                    className="flex flex-col bg-white pointer-events-auto max-w-full max-h-full h-full dark:bg-neutral-800">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 id="hs-full-screen-label" className="font-bold text-gray-800 dark:text-white">
                            Chat
                        </h3>
                        <button type="button"
                                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                aria-label="Schließen" data-hs-overlay={"#" + id}>
                            <span className="sr-only">Schließen</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        <ul className="space-y-5">
                            {comments.map(c => <PMChatBubble key={c.id} author={c.user} ownMessage={userId === c.userId} message={c.content} timestamp={c.created} />)}
                        </ul>
                    </div>
                    <div
                        className="flex justify-end items-center gap-x-2 py-3 px-4 mt-auto border-t dark:border-neutral-700">
                        <div className={"w-full"}>
                            <label htmlFor="writing" className="sr-only">Kommentar schreiben</label>
                            <div className="flex rounded-lg shadow-sm">
                                <input type="text" id="writing"
                                       name="writing"
                                       value={writing}
                                       disabled={!canWrite}
                                       onChange={e => setWriting(e.target.value)}
                                       placeholder={canWrite ? "Kommentar verfassen..." : "Keine Berechtigung zur Chatteilnahme."}
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
            </div>
        </div>
    </>;
});

export default PMChat;

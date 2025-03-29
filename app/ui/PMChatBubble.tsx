import React from "react";
import moment from "moment";

interface PMChatBubbleProps {
    author: string;
    message: string;
    timestamp: Date;
    sent?: boolean;
    ownMessage?: boolean;
}

const PMChatBubble = React.memo(({author, message, timestamp, sent = true, ownMessage = false}: PMChatBubbleProps) => {
    return <>
        {ownMessage && <>
            <li className="flex ms-auto gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                    <div className="inline-flex flex-col justify-end">
                        <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                            <p className="text-sm text-white">
                                {message}
                            </p>
                        </div>
                        {sent && <span
                            className="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500 dark:text-neutral-500">
                          <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                               fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 7 17l-5-5"></path>
                            <path d="m22 10-7.5 7.5L13 16"></path>
                          </svg>
                          Gesendet
                        </span>}
                        {!sent && <span className="mt-1.5 flex items-center gap-x-1 text-xs text-red-500">
                            <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" x2="12" y1="8" y2="12"></line>
                              <line x1="12" x2="12.01" y1="16" y2="16"></line>
                            </svg>
                            Nicht gesendet
                          </span>}
                    </div>
                </div>

                {// <PMUserDisplay userId={author.id} avatarOnly={true} />
                }
            </li>
        </>}
        {!ownMessage && <>
            <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
                {//<PMUserDisplay userId={author.id} avatarOnly={true} />
                }

                <div>
                    <div
                        className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                        <p className="text-sm text-gray-800 dark:text-white">
                            {message}
                        </p>
                    </div>
                    {sent && <span
                        className="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500 dark:text-neutral-500">
                          <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24"
                               fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                               strokeLinejoin="round">
                            <path d="M18 6 7 17l-5-5"></path>
                            <path d="m22 10-7.5 7.5L13 16"></path>
                          </svg>
                        {moment(timestamp).format("DD.MM.YY HH:mm")}
                        </span>}
                </div>
            </li>
        </>}
    </>;
});

export default PMChatBubble;

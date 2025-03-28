import {Link} from "react-router-dom";
import {ActionFunctionArgs, LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export function action({request, params}: ActionFunctionArgs) {

    return {success: false};
}

export function loader({request, params}: LoaderFunctionArgs) {

    const id = params.id ?? "1";

    return {id};
}

export default function Index() {

    const data = useLoaderData<typeof loader>();

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-16">
                <header className="flex flex-col items-center gap-9">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Willkommen bei <span className="sr-only">Redis-Chat</span>
                    </h1>
                    <div className="h-[144px] w-[434px]">
                        <img
                            src="/logo.png"
                            alt="RChat"
                            className="block w-full"
                        />
                    </div>
                </header>
                <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
                    <p className="leading-6 text-gray-700 dark:text-gray-200">
                        Chat öffnen
                    </p>
                    <ul>
                        <li>
                            <Link
                                className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                                to="/chat/1"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                                >
                                    <path
                                        d="M8.51851 12.0741L7.92592 18L15.6296 9.7037L11.4815 7.33333L12.0741 2L4.37036 10.2963L8.51851 12.0741Z"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Chat 1
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                                to="/chat/2"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                                >
                                    <path
                                        d="M8.51851 12.0741L7.92592 18L15.6296 9.7037L11.4815 7.33333L12.0741 2L4.37036 10.2963L8.51851 12.0741Z"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Chat 2
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                                to="/chat/3"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                                >
                                    <path
                                        d="M8.51851 12.0741L7.92592 18L15.6296 9.7037L11.4815 7.33333L12.0741 2L4.37036 10.2963L8.51851 12.0741Z"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Chat 3
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                                to="/chat/4"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                                >
                                    <path
                                        d="M8.51851 12.0741L7.92592 18L15.6296 9.7037L11.4815 7.33333L12.0741 2L4.37036 10.2963L8.51851 12.0741Z"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Chat 4
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

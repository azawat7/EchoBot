import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function AccountButton() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };

    if (session) {
        return (
            <>
                <div>
                    <button
                        className="pr-4 pl-4 pt-1 pb-1 rounded-full font-bold text-[1.15rem] bg-blue-900 transition-all ease-in-out hover:bg-blue-600 flex items-center"
                        onClick={handleOpen}
                    >
                        <img
                            src={session.user.image}
                            alt="avatar"
                            className="h-7 mr-3 rounded-full"
                        ></img>
                        {session.user.name}
                    </button>
                    <ul
                        className={`${
                            open
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                        } transition-all absolute top-16 pl-8 pr-8 pt-3 pb-3 bg-gray-900 text-center rounded-xl`}
                    >
                        <li>
                            <button className="bg-blue-600 hover:bg-blue-800 transition-all w-full pl-4 pr-4 pb-1 pt-1 rounded-full">
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                className="bg-rose-600 hover:bg-rose-900 mt-2 transition-all w-full pl-4 pr-4 pb-1 pt-1 rounded-full"
                                onClick={() => signOut()}
                            >
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            </>
        );
    } else {
        return (
            <>
                <button
                    className="pr-4 pl-4 pt-1 pb-1 rounded-full font-bold text-[1.15rem] bg-rose-900 transition-all ease-in-out hover:bg-rose-600"
                    onClick={() => signIn("discord")}
                >
                    Login
                </button>
            </>
        );
    }
}

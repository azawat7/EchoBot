import AccountButton from "./AccountButton";
import Link from "next/link";

export default function Navbar() {
    const items = [
        {
            label: "Commands",
            href: "/commands",
            index: 1,
        },
        {
            label: "Github",
            href: "https://github.com/azawat7/EchoBot",
            index: 2,
        },
        {
            label: "Privacy",
            href: "/",
            index: 3,
        },
    ];

    return (
        <>
            <nav className="w-full h-14 bg-gray-900 flex justify-center items-center text-white">
                <div className="flex w-full h-full justify-around items-center">
                    <Link href="/" className="circle"></Link>
                    <div className="flex">
                        {items.map((i) => (
                            <div
                                key={i.index}
                                className="pr-6 pl-6 transition-all hover:scale-125 hover:text-gray-200 self-center"
                            >
                                <Link
                                    className="font-bold text-[1.15rem]"
                                    href={i.href}
                                >
                                    {i.label}
                                </Link>
                            </div>
                        ))}
                        <AccountButton />
                    </div>
                </div>
            </nav>
        </>
    );
}

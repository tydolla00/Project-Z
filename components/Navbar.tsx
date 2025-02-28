import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Navbar</div>
      <div className="flex items-center space-x-4">
        <Link href="/">Home</Link>
        <Link href="/dex">Dex</Link>
        <Link href="/trading">Trading</Link>
      </div>
    </nav>
  );
};

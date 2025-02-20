import LazyImage from "@/components/LazyImage";
import { ModeToggle } from "@/next-themes/modetoggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
      <Test />
    </main>
  );
}

const Test = () => (
  <div style={{ height: "150vh", padding: "20px" }}>
    <h1>Scroll down to load the image</h1>
    {/* Some content to create scroll space */}
    <div style={{ height: "100vh" }} />
    <LazyImage
      src="https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A2/A2_001_EN.webp"
      alt="Pokémon Card Image"
      defaultUrl="https://via.placeholder.com/300x400?text=Loading..."
      width={300}
      height={400}
    />
  </div>
);

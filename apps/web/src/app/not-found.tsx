import { buttonVariants } from "@workspace/ui/components/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-6 py-24">
      <div className="grid w-full max-w-2xl justify-items-center gap-8 text-center">
        <div className="inline-flex items-center gap-2.5 border border-border px-3 py-1.5 font-light font-mono text-foreground text-sm uppercase tracking-[0.28px]">
          <span className="size-2 shrink-0 rounded-[1px] bg-accent-green" />
          <span>Not found</span>
        </div>

        <h1 className="font-normal text-[clamp(6rem,26vw,15rem)] text-foreground leading-[0.8] tracking-tighter">
          {"4"}
          <span className="bg-grid-dots bg-clip-text text-foreground [-webkit-text-fill-color:transparent]">
            {"0"}
          </span>
          {"4"}
        </h1>

        <h2 className="max-w-2xl text-balance font-normal text-3xl tracking-tight sm:text-4xl">
          The page you are looking for does not exist.
        </h2>

        <Link
          className={buttonVariants({
            size: "sm",
            variant: "secondary",
            className:
              "h-9 rounded-full px-4 font-mono font-normal text-sm uppercase tracking-wide",
          })}
          data-slot="button"
          data-variant="secondary"
          href="/"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}

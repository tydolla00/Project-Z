import { cn } from "@/lib/utils";

export const FillText = ({
  text,
  className,
  overrideGroup = false,
  ...props
}: FillTextProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(!overrideGroup && "group/fill", "relative max-w-fit")}
      {...props}
    >
      <div>{text}</div>
      <span
        aria-hidden
        className={cn(
          "absolute top-0 left-0 text-sky-500 duration-1000 [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)]",
          `group-hover/fill:duration-400 group-hover/fill:[clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]`,
          className,
        )}
      >
        {text}
      </span>
    </div>
  );
};

type FillTextProps = {
  text: string;
  className?: string;
  overrideGroup?: boolean;
};

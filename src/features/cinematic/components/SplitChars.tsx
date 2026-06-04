type SplitCharsProps = {
  text: string;
  className?: string;
};

export function SplitChars({ text, className }: SplitCharsProps) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="cinematic-char"
          aria-hidden={char !== " "}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}

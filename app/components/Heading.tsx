type Props = {
  as?: keyof JSX.IntrinsicElements;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?:
    | "text-md"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-3xl"
    | "text-4xl";
};

export function Heading(props: Props) {
  const {
    badge,
    children,
    as: Tag = "h1",
    className = "",
    size = "text-2xl",
  } = props;
  return (
    <div className="flex gap-4siz items-center">
      <Tag className={`font-semibold ${className} ${size}`}>{children}</Tag>
      {badge}
    </div>
  );
}

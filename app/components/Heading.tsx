type Props = {
  as?: keyof JSX.IntrinsicElements;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: "lg" | "xl" | "2xl" | "3xl" | "4xl";
};

export function Heading(props: Props) {
  const {
    badge,
    children,
    as: Tag = "h1",
    className = "",
    size = "2xl",
  } = props;
  return (
    <div className="flex gap-4siz items-center">
      <Tag className={`font-semibold ${className} text-${size}`}>
        {children}
      </Tag>
      {badge}
    </div>
  );
}

type Props = {
  children: React.ReactNode;
  isMobile?: boolean;
};

export function Container(props: Props) {
  const { isMobile = false, children } = props;
  const maxWidthClass = isMobile ? "max-w-xl" : "max-w-4xl";
  return <div className={`container mx-auto ${maxWidthClass}`}>{children}</div>;
}

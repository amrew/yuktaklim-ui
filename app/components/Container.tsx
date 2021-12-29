type Props = {
  children: React.ReactNode;
};

export function Container(props: Props) {
  const { children } = props;
  return <div className="container max-w-4xl mx-auto">{children}</div>;
}

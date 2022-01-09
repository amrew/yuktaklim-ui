type Props = {
  children: React.ReactNode;
};

export function Card(props: Props) {
  return (
    <article
      className={`mt-4 rounded-md border shadow-sm bg-white border-gray-200`}
    >
      {props.children}
    </article>
  );
}

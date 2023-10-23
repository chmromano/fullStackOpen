interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Content = ({ content }: { content: Array<ContentProps> }) => (
  <>
    {content.map((c: ContentProps) => (
      <p key={c.name}>
        {c.name} {c.exerciseCount}
      </p>
    ))}
  </>
);

export default Content;

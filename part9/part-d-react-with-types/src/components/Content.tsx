import { CoursePart } from "../types";

import Part from "./Part";

interface ContentProps {
  content: Array<CoursePart>;
}

const Content = ({ content }: ContentProps) => (
  <>
    {content.map((part: CoursePart) => (
      <Part key={part.name} part={part} />
    ))}
  </>
);

export default Content;

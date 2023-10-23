import { assertNever } from "../utils";

import {
  CoursePart,
  CoursePartBackground,
  CoursePartBasic,
  CoursePartGroup,
  CoursePartSpecial,
} from "../types";

const BasicPart = ({ part }: { part: CoursePartBasic }) => (
  <p>
    <b>
      {part.name} {part.exerciseCount}
    </b>
    <br />
    <i>{part.description}</i>
  </p>
);

const GroupPart = ({ part }: { part: CoursePartGroup }) => (
  <p>
    <b>
      {part.name} {part.exerciseCount}
    </b>
    <br />
    group project exercises: {part.groupProjectCount}
  </p>
);

const BackgroundPart = ({ part }: { part: CoursePartBackground }) => (
  <p>
    <b>
      {part.name} {part.exerciseCount}
    </b>
    <br />
    <i>{part.description}</i>
    <br />
    background material: {part.backgroundMaterial}
  </p>
);

const SpecialPart = ({ part }: { part: CoursePartSpecial }) => (
  <p>
    <b>
      {part.name} {part.exerciseCount}
    </b>
    <br />
    <i>{part.description}</i>
    <br />
    required skills: {part.requirements.join(", ")}
  </p>
);

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return <BasicPart part={part} />;
    case "group":
      return <GroupPart part={part} />;
    case "background":
      return <BackgroundPart part={part} />;
    case "special":
      return <SpecialPart part={part} />;
    default:
      return assertNever(part);
  }
};

export default Part;

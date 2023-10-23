interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartBaseDescription {
  kind: "basic";
}

export interface CoursePartBackground extends CoursePartBaseDescription {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CoursePartBaseDescription {
  requirements: Array<string>;
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

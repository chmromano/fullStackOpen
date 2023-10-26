import { Entry } from "../../types";

import SingleEntry from "./SingleEntry";

interface EntriesListProps {
  entries: Entry[];
}

const EntriesList = ({ entries }: EntriesListProps) => (
  <>
    <h2>Entries</h2>
    <ul>
      {entries.map((e: Entry) => (
        <SingleEntry key={e.id} entry={e} />
      ))}
    </ul>
  </>
);

export default EntriesList;

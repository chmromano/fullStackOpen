import { useState, SyntheticEvent, useEffect } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Input,
} from "@mui/material";

import { Diagnosis, EntryFormValues } from "../../types";
import diagnosisService from "../../services/diagnoses";
import useField from "../../hooks/useField";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const OccupationalHealthcareForm = ({ onCancel, onSubmit }: Props) => {
  const { ...description } = useField("text");
  const { ...date } = useField("date");
  const { ...specialist } = useField("text");
  const { ...employerName } = useField("text");

  const { ...startDate } = useField("date");
  const { ...endDate } = useField("date");

  const [diagnosisCodeOptions, setDiagnosisCodeOptions] = useState<string[]>();
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<
    string[]
  >([]);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnosisCodeOptions(diagnoses.map((d: Diagnosis) => d.code));
    };
    void fetchDiagnosesList();
  }, []);

  if (!diagnosisCodeOptions) {
    return <>Loading...</>;
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const entry: EntryFormValues = {
      type: "OccupationalHealthcare",
      description: description.value,
      date: date.value,
      specialist: specialist.value,
      employerName: employerName.value,
    };

    if (selectedDiagnosisCodes.length !== 0) {
      entry.diagnosisCodes = selectedDiagnosisCodes;
    }

    if (startDate.value || endDate.value) {
      entry.sickLeave = {
        startDate: startDate.value,
        endDate: endDate.value,
      };
    }

    onSubmit(entry);
  };

  const onDiagnosisCodeChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    setSelectedDiagnosisCodes(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField label="Description" fullWidth {...description} />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <Input fullWidth {...date} />
        <TextField label="Specialist" fullWidth {...specialist} />
        <TextField label="Employer name" fullWidth {...employerName} />
        <InputLabel style={{ marginTop: 20 }}>Sick leave</InputLabel>
        <InputLabel style={{ marginLeft: 20 }}>Start date</InputLabel>
        <Input style={{ marginLeft: 20 }} fullWidth {...startDate} />
        <InputLabel style={{ marginLeft: 20 }}>End date</InputLabel>
        <Input style={{ marginLeft: 20 }} fullWidth {...endDate} />

        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
        <Select
          multiple
          fullWidth
          value={selectedDiagnosisCodes}
          onChange={onDiagnosisCodeChange}
        >
          {diagnosisCodeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default OccupationalHealthcareForm;

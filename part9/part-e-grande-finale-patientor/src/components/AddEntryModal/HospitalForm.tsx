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

const HospitalForm = ({ onCancel, onSubmit }: Props) => {
  const { ...description } = useField("text");
  const { ...date } = useField("date");
  const { ...specialist } = useField("text");
  const { ...criteria } = useField("text");
  const { ...dischargeDate } = useField("date");

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
      type: "Hospital",
      description: description.value,
      date: date.value,
      specialist: specialist.value,
    };

    if (selectedDiagnosisCodes.length !== 0) {
      entry.diagnosisCodes = selectedDiagnosisCodes;
    }

    if (criteria.value || dischargeDate.value) {
      entry.discharge = {
        criteria: criteria.value,
        date: dischargeDate.value,
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
        <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
        <TextField style={{ marginLeft: 20 }} fullWidth {...criteria} />
        <InputLabel style={{ marginLeft: 20 }}>Date</InputLabel>
        <Input style={{ marginLeft: 20 }} fullWidth {...dischargeDate} />

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

export default HospitalForm;

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

import { Diagnosis, EntryFormValues, HealthCheckRating } from "../../types";
import diagnosisService from "../../services/diagnoses";
import useField from "../../hooks/useField";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface HealthCheckRatingOption {
  value: number;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating
)
  .filter((value): value is HealthCheckRating => typeof value === "number")
  .map((value) => ({
    value: value as HealthCheckRating,
    label: HealthCheckRating[value as HealthCheckRating],
  }));

const HealthCheckForm = ({ onCancel, onSubmit }: Props) => {
  const { ...description } = useField("text");
  const { ...date } = useField("date");
  const { ...specialist } = useField("text");
  const [rating, setRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

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
      type: "HealthCheck",
      description: description.value,
      date: date.value,
      specialist: specialist.value,
      healthCheckRating: rating,
    };

    if (selectedDiagnosisCodes.length !== 0) {
      entry.diagnosisCodes = selectedDiagnosisCodes;
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

  const onRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      if (!isNaN(value)) {
        setRating(value);
      }
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField label="Description" fullWidth {...description} />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <Input fullWidth {...date} />
        <TextField label="Specialist" fullWidth {...specialist} />

        <InputLabel style={{ marginTop: 20 }}>Health check rating</InputLabel>
        <Select
          label="Health check rating"
          fullWidth
          value={rating}
          onChange={onRatingChange}
        >
          {healthCheckRatingOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

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

export default HealthCheckForm;

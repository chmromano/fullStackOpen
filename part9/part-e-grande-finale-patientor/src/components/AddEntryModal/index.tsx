import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
  Select,
  InputLabel,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

import { EntryFormValues } from "../../types";
import { useState } from "react";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const entryTypeOptions = [
  "Hospital",
  "Health Check",
  "Occupational Healthcare",
];

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [entryType, setEntryType] = useState(entryTypeOptions[0]);

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      if (entryTypeOptions.includes(value)) {
        setEntryType(value);
      }
    }
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
        <Select fullWidth value={entryType} onChange={onEntryTypeChange}>
          {entryTypeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {entryType === "Hospital" ? (
          <HospitalForm onSubmit={onSubmit} onCancel={onClose} />
        ) : entryType === "Health Check" ? (
          <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
        ) : entryType === "Occupational Healthcare" ? (
          <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;

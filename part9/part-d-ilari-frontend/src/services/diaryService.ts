import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaryEntries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  console.log(response);
  return response.data;
};

export const createDiaryEntry = async (
  object: NewDiaryEntry
): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(baseUrl, object);
  return response.data;
};

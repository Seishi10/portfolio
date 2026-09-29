export type CaseFile = {
  id: string;
  case_number: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  writeup: string | null;
  drive_url: string | null;
  created_at: string;
};

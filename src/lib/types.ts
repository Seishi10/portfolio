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

export type GearItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: string | null;
  product_url: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
};

export type SiteSettings = {
  id: string;
  github_username: string;
  github_url: string;
  github_note: string | null;
};

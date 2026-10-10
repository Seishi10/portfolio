import type { GearItem, SiteSettings } from "@/lib/types";

export const fallbackGear: GearItem[] = [
  {
    id: "acer-nitro-anv15-51-53dg",
    name: "Acer Nitro ANV15-51-53DG",
    category: "Laptop",
    specs: "Intel Core i5-13420H · 13th Gen · 8-core · 2.10 GHz\nRTX 4050 · 6 GB GDDR6 · up to 1695 MHz · 75 W\n15.6\" FHD IPS matte LCD · 144 Hz · 45% NTSC\n8 GB DDR5 (up to 32 GB) · 512 GB PCIe NVMe M.2",
    description: "Primary machine for development, coursework, security labs, and everyday work.",
    product_url: null,
    image_url: null,
    sort_order: 1,
    created_at: "",
  },
  {
    id: "software-tools",
    name: "Software tools",
    category: "Software",
    specs: "Git · GitHub · Visual Studio · Arduino IDE",
    description: "The development tools I use to build, version, test, and work with embedded projects.",
    product_url: null,
    image_url: null,
    sort_order: 2,
    created_at: "",
  },
  {
    id: "security-tools",
    name: "Security tools",
    category: "Software",
    specs: "Splunk · Wireshark · Nmap",
    description: "Tools for packet inspection, security analysis, and learning how systems behave under pressure.",
    product_url: null,
    image_url: null,
    sort_order: 3,
    created_at: "",
  },
];

export const fallbackSettings: SiteSettings = {
  id: "main",
  github_username: "Seishi10",
  github_url: "https://github.com/Seishi10",
  github_note: null,
};

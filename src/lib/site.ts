import raw from "@/data/site.json";

export type Block =
  | { t: "p"; v: string }
  | { t: "h"; v: string }
  | { t: "ul"; v: string[] }
  | { t: "table"; v: string[][] };

export type Product = {
  slug: string;
  title: string;
  images: string[];
  brochures: string[];
  blocks: Block[];
};

export type TreeNode = { label: string; slug: string | null; children: TreeNode[] };

const data = raw as unknown as {
  products: Record<string, Product>;
  productTree: TreeNode[];
  applicationTree: TreeNode[];
  gallery: { title: string; src: string }[];
  news: { img: string }[];
};

export const products = data.products;
export const productTree = data.productTree;
export const applicationTree = data.applicationTree;
export const gallery = data.gallery;

const ORIGIN = "https://growcontrol.in";
export const asset = (p: string) => `${ORIGIN}/${p.split("/").map(encodeURIComponent).join("/")}`;

export const company = {
  name: "Grow Control Power Tech Pvt. Ltd.",
  short: "GROW CONTROL",
  logo: asset("img/logo.png"),
  phones: ["+91 8019898939", "+91-40-27175591", "+91-40-27175386"],
  emails: ["info@growcontrol.in", "gcptpltd@gmail.com"],
  registered: "12-13-483/28/B, Street no. 1, Tarnaka, Hyderabad – 500007, Telangana, INDIA.",
  factory: "Plot no. A-19, Road no. 9, IDA Nacharam, Hyderabad – 500076, Telangana, INDIA.",
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/people/Grow-Control-Power-Tech-Pvt-LTd/61572673174481/" },
    { name: "YouTube", href: "https://www.youtube.com/@growcontrol" },
    { name: "Instagram", href: "https://www.instagram.com/grow_control/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/growcontrols/" },
    { name: "X", href: "https://x.com/growcontrol_6" },
  ],
};

export const telHref = (p: string) => `tel:${p.replace(/[^+\d]/g, "")}`;

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** All product slugs below a node, de-duplicated, in order. */
export function leafSlugs(node: TreeNode): string[] {
  const out: string[] = [];
  const walk = (n: TreeNode) => {
    if (n.slug && !out.includes(n.slug)) out.push(n.slug);
    n.children.forEach(walk);
  };
  if (node.slug && node.children.length === 0) out.push(node.slug);
  node.children.forEach(walk);
  if (node.slug && !out.includes(node.slug)) out.unshift(node.slug);
  return out;
}

export function categoryOf(slug: string): TreeNode | undefined {
  return productTree.find((c) => leafSlugs(c).includes(slug));
}

export function summary(p: Product, max = 150) {
  const first = p.blocks.find((b) => b.t === "p") as { v: string } | undefined;
  const t = first?.v ?? "";
  return t.length > max ? t.slice(0, max).replace(/\s+\S*$/, "") + "…" : t;
}

export const featuredCategories = [
  { title: "High Voltage Power Supplies", img: asset("img/High Voltage Power Supplies.jpg"), slug: "high-voltage-power-supplies" },
  { title: "High Frequency AC Power Supplies", img: asset("img/ac-ac.jpg"), slug: "high-frequency-ac-power-supplies" },
  { title: "AC–DC Converter", img: asset("img/AC- DC Converter.jpg"), slug: "ac-dc-converter" },
  { title: "DC–AC Converter", img: asset("img/DC-AC Converter1.jpg"), slug: "dc-ac-converter" },
  { title: "High Power DC–DC Converter", img: asset("img/DC-DC CONVERTER-home.jpg"), slug: "high-power-dc-dc-converter" },
  { title: "High Frequency Pulse Power Supplies", img: asset("img/Pulse power supply.jpg"), slug: "high-frequency-pulse-power-supplies" },
];

export const applicationIcons: Record<string, string> = {
  "Radar Power Supplies": asset("images/i-6.png"),
  "Plasma Power Supplies": asset("images/i-7.png"),
  "Pulse Power Supply": asset("images/i-6.png"),
  "Capacitor Charging Power Supplies": asset("images/i-2.png"),
  "Battery Chargers": asset("images/i-1.png"),
  "Frequency Converters": asset("images/i-5.png"),
  "Laser Power Supply": asset("images/i-4.png"),
  "Electromagnetic Forming Machine": asset("images/i-3.png"),
};

export const clientLogos = [
  ...Array.from({ length: 22 }, (_, i) => asset(`img/l-${i + 1}.png`)),
  ...Array.from({ length: 34 }, (_, i) => asset(`img/I-${i + 24}.png`)),
];

export const news = [
  {
    img: asset("images/news-1.jpg"),
    title: "Indigenous Solid-State High Voltage Klystron Modulator delivered to the Indian Air Force",
    body: [
      "We are proud to announce the successful design and development of an Indigenous Solid-State High Voltage Klystron Modulator by Grow Control Power Tech Pvt Ltd, tailored for critical Indian Defence applications. This system has been developed and delivered to the Indian Air Force through Bharat Electronics Limited (BEL), underlining our commitment to the Atmanirbhar Bharat initiative and self-reliance in high-power RF systems.",
      "The modulator is based on an IGBT-based solid-state architecture, ensuring high efficiency, fast switching, precise pulse control, and robust performance under extreme conditions — making it ideal for High Power Microwave (HPM) and RADAR systems.",
    ],
    highlights: [
      "Fully indigenized design and production",
      "High-voltage solid-state switching",
      "Precision-controlled pulse output",
      "Qualified for defense-grade performance",
    ],
    links: ["https://www.facebook.com/BharatElectronicsLimited/posts/bharat-electronics-ltd-bel-has-developed-a-significant-technological-upgrade-to-/1038979781567867/"],
  },
  {
    img: asset("images/news-2.jpg"),
    title: "Powering DRDO's 30 kW Directed Energy Weapon trials",
    body: [
      "India's strides in Directed Energy Weapons (DEW) reached a new milestone with the successful 30 kW DEW trials conducted by DRDO — a true testament to the power of indigenous innovation. GROW CONTROL is proud to have contributed to this landmark achievement by delivering power supply systems custom-developed to meet DRDO's stringent technical requirements.",
      "Under the guidance of DRDO, our power electronics solutions played a key role in enabling high-performance LASER platforms.",
    ],
    highlights: [],
    links: ["https://timesofindia.indiatimes.com/india/india-tests-laser-system-to-destroy-aerial-targets/articleshow/120266057.cms"],
  },
  {
    img: asset("images/news-3.jpg"),
    title: "Supporting the Long Range Glide Bomb (LRGB) trials",
    body: [
      "India continues to push the boundaries of defense technology with the successful trials of Long Range Glide Bombs (LRGB) across all branches of the armed forces. GROW CONTROL played a vital role by delivering mission-critical power supply systems tailored to meet the exacting standards of DRDO.",
      "Innovation, Precision, Self-Reliance. Together, we're powering India's journey toward technological strength and national security.",
    ],
    highlights: [],
    links: ["https://www.youtube.com/watch?v=9sTCDFbght8", "https://pib.gov.in/PressReleasePage.aspx?PRID=2044995"],
  },
  {
    img: asset("images/news 4.jpg"),
    title: "Elbit Systems visits our facility",
    body: [
      "Mr. Yoav Lehiman, Regional Director at Elbit Systems, along with his team, recently visited our facility to discuss the Induction Annealing System. Elbit Systems had previously supplied the system to an Indian Ordnance Factory but faced challenges in demonstrating its functionality. Upon their request, our team successfully repaired the system and carried out a live demonstration.",
    ],
    highlights: [],
    links: [],
  },
];

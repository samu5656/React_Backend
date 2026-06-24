// Static content for the Model 500 site.

export const navLinks = [
  { href: "#product", label: "Product" },
  { href: "#engineering", label: "Technology" },
  { href: "#how", label: "How It Works" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export const cutawayAnnotations = [
  {
    idx: "01",
    title: "Modular Storage Tank",
    body: "High-volume stainless steel with a sealed, weatherproof lid that keeps feed dry and prevents spoilage.",
  },
  {
    idx: "02",
    title: "Main AC Motor",
    body: "A powerful, isolated drive that reduces mechanical strain and extends service life.",
  },
  {
    idx: "03",
    title: "Precision Internal Conveyor",
    body: "A regulated auger meters feed for consistent, clog-free delivery at any dose.",
  },
  {
    idx: "04",
    title: "Rotary Distributor",
    body: "Multi-directional spin broadcasts feed evenly and eliminates overfeeding.",
  },
  {
    idx: "05",
    title: "Widespread Broadcaster Nozzle",
    body: "Engineered for a uniform 360° spread across large pond areas.",
  },
  {
    idx: "06",
    title: "Advanced Dosing Controller",
    body: "Programs exact dosage and intervals, with full on-site control.",
  },
];

export const engineeringSpecs = [
  {
    no: "A",
    title: "Separated Dual-Motor System",
    body: "Dedicated drives for conveyor and distributor remove cross-load and let each run at its optimal speed.",
  },
  {
    no: "B",
    title: "High-Precision Conveyor",
    body: "A regulated auger doses feed by the gram for repeatable, clog-free delivery cycle after cycle.",
  },
  {
    no: "C",
    title: "Segmented Rotary Distributor",
    body: "Vaned segments fling feed in a controlled, even pattern for true wide-area broadcast.",
  },
  {
    no: "D",
    title: "Advanced Controller Unit",
    body: "An on-board controller programs dose, interval and run-time, and surfaces fault alerts.",
  },
];

export const steps = [
  {
    n: 1,
    title: "Modular Pontoon Assembly",
    body: "Snap-together float modules carry the unit on any pond surface — stable, repositionable, tool-light.",
    chips: ["Float modules", "No fixed mount"],
  },
  {
    n: 2,
    title: "Hoisting & Loading",
    body: "Lift and fill the tank to its max-load mark; the sealed lid keeps the full 50 kg charge dry.",
    chips: ["Max load", "Sealed fill"],
  },
  {
    n: 3,
    title: "Remote Control App",
    body: "Set the feed schedule and dosage %, then watch live status and error alerts from anywhere.",
    chips: ["Schedule", "Dosage %", "Alerts"],
  },
  {
    n: 4,
    title: "Water-Quality Integration",
    body: "Optional DO, pH and temperature sensors tune feeding to live pond conditions.",
    chips: ["DO", "pH", "Temp"],
  },
];

export const gallery = [
  {
    src: "/assets/04-pond-golden.jpeg",
    alt: "The feeder broadcasting feed in a wide arc across a pond at sunset",
    k: "Broadcast",
    t: "A uniform feed arc across the whole pond, every cycle.",
    tall: true,
  },
  {
    src: "/assets/06-field-guide.jpeg",
    alt: "Farmers operating and monitoring the feeder from the pontoon",
    k: "Operation",
    t: "Run by the crew, controlled from a phone.",
  },
  {
    src: "/assets/02-harvest-shrimp.jpeg",
    alt: "Hands holding healthy harvested shrimp above the water",
    k: "Result",
    t: "Even growth, healthier stock, cleaner water.",
  },
];

export const solutions = [
  {
    src: "/assets/01-tank-farm.jpeg",
    alt: "Covered intensive shrimp tank farm",
    k: "Intensive",
    title: "Intensive Shrimp Ponds",
    body: "High-density systems where exact dosing and clean water decide the harvest.",
  },
  {
    src: "/assets/04-pond-golden.jpeg",
    alt: "Open aquaculture pond with aerators",
    k: "Finfish",
    title: "Fish Aquaculture",
    body: "Wide, even broadcast suits surface-feeding finfish across large open ponds.",
  },
  {
    src: "/assets/06-field-guide.jpeg",
    alt: "Multiple feeders across a multi-pond farm",
    k: "At scale",
    title: "Large Multi-Pond Farms",
    body: "Standardised units and remote scheduling keep every pond on the same regimen.",
  },
  {
    src: "/assets/02-harvest-shrimp.jpeg",
    alt: "Healthy juvenile shrimp",
    k: "Early stage",
    title: "Hatcheries & Nurseries",
    body: "Fine, frequent micro-doses support delicate early-stage stock without fouling.",
  },
];

export const team = [
  {
    photo: "/assets/team/dineshvaran.jpeg",
    name: "Dineshvaran S",
    role: "Aeronautical Engineering",
    bio: "Passionate about aquaculture innovations and sustainable solutions — designing efficient, safe and environmentally-responsible farming methods for the future of global food security.",
    linkedin: "https://www.linkedin.com/in/s-dinesh-varan-39b49b386",
    badge: null,
  },
  {
    photo: "/assets/team/theneeshwaran.jpeg",
    name: "Theneeshwaran M",
    role: "Mechanical Engineering",
    bio: "Passionate about mechanical design and sustainable solutions, with a strong focus on supporting efficient project development and lifecycle optimization.",
    linkedin: "https://www.linkedin.com/in/theneeshwaran-m-a23742367",
    badge: null,
  },
  {
    photo: "/assets/team/brathikan.jpeg",
    name: "Brathikan V. M",
    role: "Innovation Expert",
    bio: "A result-oriented mechanical engineer with extensive experience in innovative product design and detailed design optimization for manufacturing and system lifecycle efficiency.",
    linkedin: "#",
    badge: "Project Advisor",
  },
  {
    photo: "/assets/team/krisnan.jpeg",
    name: "Krisnan K",
    role: "Mechanical Engineer",
    bio: "A dedicated mechanical engineer with an eye for innovation — leading with creativity to solve complex problems and drive technological advancement on every project.",
    linkedin: "#",
    badge: null,
  },
];

export const contact = {
  email: "react@kct.ac.in",
  phone: "+91 99948 27481",
  phoneHref: "tel:+919994827481",
  location: "Kumaraguru College of Technology",
};

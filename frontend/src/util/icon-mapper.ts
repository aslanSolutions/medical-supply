export const medicalIcons: Record<string, string> = {
  syringe: "💉",
  ointment: "🧴",
  bandage: "🩹",
  stethoscope: "🩺",
  thermometer: "🌡️",
  pill: "💊",
  mask: "😷",
  microscope: "🔬",
  dna: "🧬",
  hospital: "🏥",
  ambulance: "🚑",
  dropper: "🩸",
  adhesive: "🩻",
  clipboard: "📋",
  wheelchair: "🦽",
  crutch: "🩼",
  gloves: "🧤",
  goggles: "🥽",
};

const DEFAULT_ICON = "🏥";

export function getArticlelIcon(name?: string | null): string {
  if (!name) return DEFAULT_ICON;
  return medicalIcons[name.toLowerCase()] ?? DEFAULT_ICON;
}

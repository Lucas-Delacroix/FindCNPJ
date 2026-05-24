type SegmentRange = {
  min: number;
  max: number;
  segment: string;
};

const SEGMENTS: SegmentRange[] = [
  { min: 1, max: 3, segment: "Agronegócio" },
  { min: 5, max: 9, segment: "Indústria Extrativa" },
  { min: 10, max: 33, segment: "Indústria de Transformação" },
  { min: 35, max: 39, segment: "Energia, Água e Saneamento" },
  { min: 41, max: 43, segment: "Construção" },
  { min: 45, max: 47, segment: "Comércio" },
  { min: 49, max: 53, segment: "Transporte e Logística" },
  { min: 55, max: 56, segment: "Hospitalidade" },
  { min: 58, max: 63, segment: "Tecnologia da Informação" },
  { min: 64, max: 66, segment: "Serviços Financeiros" },
  { min: 68, max: 68, segment: "Imobiliário" },
  { min: 69, max: 75, segment: "Serviços Profissionais" },
  { min: 77, max: 82, segment: "Serviços Administrativos" },
  { min: 84, max: 84, segment: "Administração Pública" },
  { min: 85, max: 85, segment: "Educação" },
  { min: 86, max: 88, segment: "Saúde" },
  { min: 90, max: 93, segment: "Cultura e Entretenimento" },
  { min: 94, max: 99, segment: "Outros Serviços" },
];

const extractDivision = (cnaeCode: number): number | null => {
  if (!Number.isFinite(cnaeCode) || cnaeCode <= 0) return null;
  const padded = String(Math.floor(cnaeCode)).padStart(7, "0");
  const division = Number(padded.slice(0, 2));
  if (!Number.isFinite(division) || division < 1 || division > 99) return null;
  return division;
};

export const mapCnaeToSegment = (cnaeCode: number): string => {
  const division = extractDivision(cnaeCode);
  if (division === null) return "Não classificado";
  const match = SEGMENTS.find((s) => division >= s.min && division <= s.max);
  return match?.segment ?? "Não classificado";
};

export const formatCnaeCode = (code: number): string => {
  const padded = String(code).padStart(7, "0");
  return `${padded.slice(0, 4)}-${padded.slice(4, 5)}/${padded.slice(5)}`;
};

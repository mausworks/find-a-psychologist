import querystring from "@/util/querystring";

const BASE_URL =
  process.env.EXPO_PUBLIC_PSYCHOLOGIST_API_BASE_URL ||
  "https://mindler.se/api/mindlerproxy/psychologists";

const PSYCHOLOGISTS_URL = BASE_URL + "/available";

export type Psychologist = {
  psychologistId: number;
  firstName: string;
  lastName: string;
  thumbnail: string;
  headline: string;
  headlineEnum: string;
  startsAt: number;
  matchingSlots: number;
  userId: number;
};

export type RequestInfo = {
  status: number;
  message: string;
};

export type PsychologistResponse = {
  data: Psychologist[];
  info: RequestInfo;
  reqId: string;
};

export const LANGUAGE_OPTIONS = {
  Arabiska: 3,
  Danska: 4,
  Dari: 30,
  Engelska: 1,
  Finska: 17,
  Franska: 9,
  Grekiska: 18,
  Kroatiska: 24,
  Nederländska: 13,
  Norska: 7,
  Persiska: 6,
  Polska: 26,
  Rumänska: 11,
  Serbiska: 28,
  Spanska: 5,
  Svenska: 2,
  Tyska: 8,
};

export const SPECIALITY_OPTIONS = {
  ADD: 16,
  ADHD: 1,
  "Aggression och ilska": 22,
  Beroende: 8,
  Depression: 5,
  "Fobier/rädslor": 2,
  Föräldrastöd: 15,
  "HBTQ+": 25,
  "IBS (känslig tarm)": 3,
  "Kronisk smärta": 4,
  "Panikångest/panikattacker": 6,
  "Problem i relationer": 7,
  "Sexuella problem": 20,
  Självkänsla: 19,
  Självsäkerhet: 24,
  "Social ångest": 9,
  Stress: 10,
  Sömnproblem: 11,
  Tinnitus: 12,
  Trauma: 23,
  "Tvångssyndrom/OCD": 13,
  "Ångest/oro": 14,
};

export type LanguageOption = keyof typeof LANGUAGE_OPTIONS;

export type SpecialityOption = keyof typeof SPECIALITY_OPTIONS;

export type PsychologistQuery = {
  language?: number;
  speciality?: number;
};

const psychologistAPI = {
  list: ({
    language,
    speciality,
  }: PsychologistQuery): Promise<PsychologistResponse> =>
    fetch(
      PSYCHOLOGISTS_URL +
        "?" +
        querystring({
          specialities: speciality,
          languages: language,
        }),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json()),
};

export default psychologistAPI;

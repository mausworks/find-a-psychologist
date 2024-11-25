import React from "react";
import psychologistAPI, {
  Psychologist,
  PsychologistQuery,
} from "@/api/psychologistAPI";

export function useFetchPsychologists({
  language,
  speciality,
}: PsychologistQuery) {
  const [psychologists, setPsychologists] = React.useState<Psychologist[]>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);

  React.useEffect(() => {
    setLoading(true);

    psychologistAPI
      .list({ language, speciality })
      .then(({ data }) => {
        setPsychologists(data);
        setError(undefined);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [language, speciality]);

  return { psychologists, error, loading };
}

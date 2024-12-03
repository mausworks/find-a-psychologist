import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useFetchPsychologists } from "@/hooks/useFetchPsychologists";
import StyledPicker from "@/components/StyledPicker";
import { LANGUAGE_OPTIONS, SPECIALITY_OPTIONS } from "@/api/psychologistAPI";
import React from "react";
import PsychologistCard from "@/components/PsychologistCard";

export default function HomeScreen() {
  const [language, setLanguage] = React.useState<number>();
  const [speciality, setSpeciality] = React.useState<number>();

  const { psychologists, error, loading } = useFetchPsychologists({
    language,
    speciality,
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>
        <View style={styles.filterCard}>
          <Text style={styles.heading}>Hitta en psykolog</Text>
          <View style={styles.filterRow}>
            <StyledPicker
              initial="Alla språk"
              entries={LANGUAGE_OPTIONS}
              value={language}
              onChange={setLanguage}
            />
            <StyledPicker
              initial="Alla områden"
              entries={SPECIALITY_OPTIONS}
              value={speciality}
              onChange={setSpeciality}
            />
          </View>
        </View>

        <View style={styles.list}>
          {!psychologists || loading ? (
            <Text style={styles.status}>Söker …</Text>
          ) : error ? (
            <Text style={styles.status}>Fel: {String(error)}</Text>
          ) : (
            <>
              <Text style={styles.status}>
                {psychologists?.length}{" "}
                {psychologists?.length === 1 ? "psykolog" : "psykologer"}{" "}
                hittades.
              </Text>
              {psychologists?.map((psychologist) => (
                <PsychologistCard
                  key={psychologist.psychologistId}
                  psychologist={psychologist}
                />
              ))}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  scrollContent: {
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: 600,
  },
  heading: {
    fontSize: 32,
    marginBottom: 16,
    fontWeight: "bold",
  },
  filterCard: {
    width: "100%",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginBottom: 24,
    gap: 8,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "stretch",
    flexGrow: 1,
    flexShrink: 0,
    gap: 8,
  },
  list: {
    width: "100%",
    gap: 12,
  },
  status: {
    marginBottom: 12,
    fontSize: 12,
    opacity: 0.6,
    textAlign: "center",
  },
});

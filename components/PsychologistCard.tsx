import { Psychologist } from "@/api/psychologistAPI";
import { View, Image, Text } from "react-native";
import { StyleSheet } from "react-native";
import { formatRelative } from "date-fns/formatRelative";
import { sv } from "date-fns/locale/sv";

export type PsychologistCardProps = {
  psychologist: Psychologist;
};

export default function PsychologistCard({
  psychologist,
}: PsychologistCardProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: psychologist.thumbnail }}
        style={styles.thumbnail}
      />

      <View style={styles.details}>
        <Text style={styles.headline}>{psychologist.headline}</Text>
        <Text style={styles.name}>
          {psychologist.firstName} {psychologist.lastName}
        </Text>
        <Text style={styles.availability}>
          Tillgänglig{" "}
          {formatRelative(psychologist.startsAt * 1000, Date.now(), {
            locale: sv,
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 24,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  thumbnail: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  details: {
    flex: 1,
    flexDirection: "column",
  },
  name: {
    fontSize: 24,
  },
  headline: {
    fontSize: 14,
    opacity: 0.6,
    fontWeight: 500,
  },
  availability: {
    marginTop: 12,
    fontSize: 14,
    fontStyle: "italic",
    opacity: 0.6,
  },
});

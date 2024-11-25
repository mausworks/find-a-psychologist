import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

export type StyledPickerProps<V extends string | number> = {
  entries: Record<string, V>;
  onChange: (value: V) => void;
  value?: V;
  initial?: string;
  initialValue?: V;
};

export default function StyledPicker<V extends string | number>({
  entries,
  onChange,
  value,
  initial,
  initialValue,
}: StyledPickerProps<V>) {
  const onValueChange = (itemValue: V, index: number) => {
    if (index === 0 && initial) {
      onChange(initialValue as V);
    } else {
      onChange(itemValue);
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {initial && <Picker.Item label={initial} value={initialValue} />}
        {Object.entries(entries).map(([label, value]) => (
          <Picker.Item key={label} label={label} value={value} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 100,
    borderColor: "#000",
    borderWidth: 1,
    height: "100%",
  },
  picker: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    padding: 10,
    borderRightWidth: 12,
    height: "100%",
  },
});
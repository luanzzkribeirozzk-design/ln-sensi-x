import { MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IconSymbolProps = {
  name: ComponentProps<typeof MaterialIcons>["name"];
  size?: number;
  color?: string;
};

export function IconSymbol({ name, size = 24, color = "#9D4EDD" }: IconSymbolProps) {
  return <MaterialIcons name={name} size={size} color={color} />;
}

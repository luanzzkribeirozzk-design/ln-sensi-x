import { ScrollView, Text, View, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

export default function SettingsScreen() {
  const colors = useColors();
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: 20 }}>

          <View style={{ alignItems: "center", paddingVertical: 16 }}>
            <Text style={{ fontSize: 22, fontWeight: "800", color: colors.primary, letterSpacing: 3 }}>
              LN SENSI X
            </Text>
            <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4 }}>
              Configurações
            </Text>
          </View>

          {/* Configurações do Overlay */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "700", color: colors.foreground, marginBottom: 16 }}>
              Overlay
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <View>
                <Text style={{ fontSize: 14, color: colors.foreground }}>Vibração ao clicar</Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>Auxílio de tiro (100ms)</Text>
              </View>
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={vibrationEnabled ? "#fff" : colors.muted}
              />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ fontSize: 14, color: colors.foreground }}>Feedback háptico</Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>Vibração nos botões do app</Text>
              </View>
              <Switch
                value={hapticEnabled}
                onValueChange={setHapticEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={hapticEnabled ? "#fff" : colors.muted}
              />
            </View>
          </View>

          {/* Informações do App */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "700", color: colors.foreground, marginBottom: 16 }}>
              Sobre o App
            </Text>
            {[
              ["Nome", "LN SENSI X"],
              ["Versão", "1.0.4"],
              ["Plataforma", "Android"],
              ["SDK", "Expo 54"],
              ["Package", "com.lnsensix.app"],
            ].map(([label, value]) => (
              <View key={label} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color: colors.muted }}>{label}</Text>
                <Text style={{ fontSize: 13, color: colors.foreground, fontWeight: "600" }}>{value}</Text>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

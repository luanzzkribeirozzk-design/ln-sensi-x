import {
  ScrollView,
  Text,
  View,
  Pressable,
  Alert,
  Platform,
  NativeModules,
  ActivityIndicator,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useOverlayService } from "@/hooks/use-overlay-service";
import * as Haptics from "expo-haptics";

const { OverlayModule } = NativeModules;

export default function HomeScreen() {
  const colors = useColors();
  const { isActive, isLoading, showOverlay, hideOverlay } = useOverlayService();

  const handleToggleOverlay = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (!isActive) {
      await showOverlay();
    } else {
      await hideOverlay();
    }
  };

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 gap-6 justify-center">

          {/* Header */}
          <View className="items-center gap-2 py-4">
            <Text
              style={{
                fontSize: 52,
                fontWeight: "900",
                color: colors.primary,
                textShadowColor: colors.primary,
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 20,
                letterSpacing: 4,
              }}
            >
              LN
            </Text>
            <Text
              style={{
                fontSize: 38,
                fontWeight: "900",
                color: colors.primary,
                textShadowColor: colors.primary,
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 16,
                letterSpacing: 6,
              }}
            >
              SENSI X
            </Text>
            <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4, letterSpacing: 2 }}>
              OVERLAY FLUTUANTE • FREE FIRE
            </Text>
            <Text style={{ fontSize: 11, color: colors.border, letterSpacing: 1 }}>
              v1.0.4
            </Text>
          </View>

          {/* Status Card */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 20,
              borderWidth: 2,
              borderColor: isActive ? colors.success : colors.border,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground }}>
                Status do Overlay
              </Text>
              <View
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: isActive ? colors.success : colors.muted,
                  shadowColor: isActive ? colors.success : "transparent",
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 8,
                  elevation: isActive ? 6 : 0,
                }}
              />
            </View>
            <Text style={{ fontSize: 14, color: isActive ? colors.success : colors.muted }}>
              {isActive ? "✓ Overlay Ativo — Botão TRICK visível" : "○ Overlay Inativo"}
            </Text>
            {isActive && (
              <Text style={{ fontSize: 12, color: colors.muted, marginTop: 6 }}>
                Minimize o app e abra o Free Fire
              </Text>
            )}
          </View>

          {/* Botão Principal */}
          <Pressable
            onPress={handleToggleOverlay}
            disabled={isLoading}
            style={({ pressed }) => ({
              backgroundColor: isActive ? colors.error : colors.primary,
              opacity: pressed || isLoading ? 0.75 : 1,
              borderRadius: 50,
              paddingVertical: 18,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: isActive ? colors.error : colors.primary,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 20,
              elevation: 10,
            })}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ fontSize: 17, fontWeight: "800", color: "#fff", letterSpacing: 2 }}>
                {isActive ? "⏹  DESATIVAR OVERLAY" : "▶  ATIVAR OVERLAY FLUTUANTE"}
              </Text>
            )}
          </Pressable>

          {/* Instruções */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "700", color: colors.foreground, marginBottom: 12 }}>
              Como usar
            </Text>
            {[
              "1. Toque em ATIVAR OVERLAY FLUTUANTE",
              "2. Conceda permissão de sobreposição se solicitado",
              "3. Minimize o app e abra o Free Fire",
              "4. O botão TRICK aparecerá sobre o jogo",
              "5. Arraste o botão para a posição desejada",
              "6. Toque no botão para vibração (auxílio de tiro)",
            ].map((step, i) => (
              <Text key={i} style={{ fontSize: 13, color: colors.muted, marginBottom: 6, lineHeight: 20 }}>
                {step}
              </Text>
            ))}
          </View>

          {/* Aviso */}
          <View
            style={{
              backgroundColor: "#1a1200",
              borderRadius: 12,
              padding: 14,
              borderWidth: 1,
              borderColor: colors.warning,
            }}
          >
            <Text style={{ fontSize: 12, color: colors.warning, fontWeight: "700", marginBottom: 4 }}>
              ⚠ AVISO
            </Text>
            <Text style={{ fontSize: 12, color: colors.muted, lineHeight: 18 }}>
              Use com responsabilidade. Este app é apenas um auxiliar de sensibilidade.
            </Text>
          </View>

        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

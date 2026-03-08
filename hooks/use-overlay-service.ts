import { useState, useCallback } from "react";
import { NativeModules, Alert, Platform } from "react-native";

const { OverlayModule } = NativeModules;

export function useOverlayService() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showOverlay = useCallback(async () => {
    if (Platform.OS !== "android") {
      Alert.alert("Aviso", "O overlay só funciona em dispositivos Android.");
      return;
    }

    setIsLoading(true);
    try {
      if (OverlayModule?.showOverlay) {
        await OverlayModule.showOverlay();
        setIsActive(true);
        Alert.alert(
          "✓ Overlay Ativado!",
          "O botão TRICK apareceu por cima do Free Fire!\n\n• Arraste para mover\n• Clique para vibrar (auxílio de tiro)\n• Mantenha o app em background"
        );
      } else {
        Alert.alert(
          "Módulo Nativo",
          "O módulo nativo de overlay não está disponível neste build."
        );
      }
    } catch (error: any) {
      Alert.alert("Erro", error?.message || "Não foi possível ativar o overlay.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const hideOverlay = useCallback(async () => {
    setIsLoading(true);
    try {
      if (OverlayModule?.hideOverlay) {
        await OverlayModule.hideOverlay();
        setIsActive(false);
      }
    } catch (error: any) {
      console.error("Erro ao desativar overlay:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkOverlayStatus = useCallback(async () => {
    try {
      if (OverlayModule?.isOverlayVisible) {
        const visible = await OverlayModule.isOverlayVisible();
        setIsActive(visible);
      }
    } catch (error) {
      console.error("Erro ao verificar status:", error);
    }
  }, []);

  return { isActive, isLoading, showOverlay, hideOverlay, checkOverlayStatus };
}

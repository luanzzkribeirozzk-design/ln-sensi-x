import React from "react";
import { View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenContainerProps extends ViewProps {
  containerClassName?: string;
  children: React.ReactNode;
}

export function ScreenContainer({
  children,
  className,
  containerClassName,
  ...props
}: ScreenContainerProps) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#151718" }}
      className={containerClassName}
    >
      <View style={{ flex: 1 }} className={className} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
}

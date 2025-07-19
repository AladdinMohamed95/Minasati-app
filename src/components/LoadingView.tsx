import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";

export const LoadingView: React.FC<{
  isLoading: boolean;
}> = React.memo(() => {
  return (
    <View style={styles.overlay}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />\
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999999,
    height: Dimensions.get("window").height,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 30,
  },
  text: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "500",
  },
  subText: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    opacity: 0.9,
  },
  progressText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  timeoutText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "#FFFFFF",
    borderWidth: 1,
  },
});

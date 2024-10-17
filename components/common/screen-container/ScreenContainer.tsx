import { COLORS } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";

interface ScreenContainerProps {
  children: React.ReactNode | React.ReactNode[];
}

const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <LinearGradient
        colors={[COLORS.lightWhite, COLORS.white]}
        start={{
          x: 0,
          y: 0.3,
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      />
      {children}
    </SafeAreaView>
  );
};

export default ScreenContainer;

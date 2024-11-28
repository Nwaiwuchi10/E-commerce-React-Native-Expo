import { Stack, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const OrdersLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
export default OrdersLayout;

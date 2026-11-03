import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-up");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-8 py-6">
      <View>
        <Text>Profile</Text>
        <TouchableOpacity
          onPress={handleLogOut}
          className="bg-red-500 px-4 py-2 rounded w-40 mt-4"
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

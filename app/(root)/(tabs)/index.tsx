import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/expo";
import Ionicon from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { property } from "../../../types/index";

// Components
import FeaturedCard from "../../../components/FeaturedCard";
import PropertyCard from "../../../components/PropertyCard";

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();

  const [featured, setFeatured] = useState<property[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState<property[]>([]);

  // console.log("Featured Properties:", featured);
  // console.log("Recommended Properties:", recommended);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { data: featuredData } = await supabase
        .from("properties")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false });

      const { data: recommendedData } = await supabase
        .from("properties")
        .select("*")
        .eq("is_featured", false)
        .order("created_at", { ascending: false });

      setFeatured(featuredData ?? []);
      setRecommended(recommendedData ?? []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProperties();
    }, []),
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList
        data={recommended}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 pt-4 pb-5">
              <Image
                source={require("../../../assets/images/Haven.png")}
                style={{ width: 100, height: 46 }}
                resizeMode="contain"
              />

              <View className="items-end">
                <Text>Good Morning</Text>
                <Text className="text-gray-900 text-base font-bold">
                  {user?.firstName ?? "User"}
                </Text>
              </View>
            </View>

            {/* Search Bar */}
            <TouchableOpacity
              onPress={() => router.push("/(root)/(tabs)/search")}
              className="mx-5 mb-6 flex-row items-center bg-white rounded-2xl px-4 py-3 gap-3"
              style={{
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Ionicon name="search" size={18} color="9CA3AF" />
              <Text className="text-gray-400 text-sm font-medium flex-1">
                Search any properties, cities..
              </Text>

              <TouchableOpacity
                onPress={() =>
                  router.push("/(root)/(tabs)/search?openFilters=true")
                }
                className="w-8 h-8 bg-blue-600 rounded-xl justify-center items-center"
              >
                <Ionicon name="options-outline" size={15} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Featured Section */}
            <View className="mb-6">
              <Text className="text-gray-900 text-lg font-bold px-5 mb-4">
                Featured
              </Text>

              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color="#2563EB"
                  className="py-10"
                />
              ) : (
                <FlatList
                  data={featured}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  renderItem={({ item }) => {
                    return <FeaturedCard property={item} />;
                  }}
                />
              )}
            </View>

            {/* Recommended Header */}
            <Text className="text-lg font-bold px-5 py-3">
              Recommended Properties
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          return (
            <View className="px-5">
              <PropertyCard property={item} />
            </View>
          );
        }}
        ListEmptyComponent={
          !isLoading ? (
            <View className="items-center py-10">
              <Text className="text-gray-400">
                No Recommended Properties Available
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

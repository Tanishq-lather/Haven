import { supabase } from "@/lib/supabase";
import type { property } from "@/types";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PropertyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [property, setProperty] = useState<property | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchProperty = async () => {
      const { data, error: queryError } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (!isActive) return;

      if (queryError) {
        console.error("Error fetching property:", queryError);
        setError("Unable to load this property.");
      } else {
        setProperty(data);
      }
      setIsLoading(false);
    };

    fetchProperty();

    return () => {
      isActive = false;
    };
  }, [id]);

  const imageUrl = property?.images[0];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {isLoading ? (
        <ActivityIndicator className="flex-1" size="large" color="#2563EB" />
      ) : error || !property ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-gray-500">
            {error ?? "Property not found."}
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: "100%", height: 280 }}
              contentFit="cover"
              accessibilityLabel={property.title}
            />
          ) : (
            <View className="h-[280px] w-full bg-gray-200" />
          )}
          <View className="gap-3 px-5 py-6">
            <Text className="text-2xl font-bold text-gray-900">
              {property.title}
            </Text>
            <Text className="text-lg font-semibold text-blue-600">
              ${property.price.toLocaleString()}
            </Text>
            <Text className="text-gray-600">
              {property.address}, {property.city}
            </Text>
            <Text className="text-gray-700">{property.description}</Text>
            <Text className="text-gray-600">
              {property.bedrooms} bedrooms · {property.bathrooms} bathrooms ·{" "}
              {property.area_sqft.toLocaleString()} sqft
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

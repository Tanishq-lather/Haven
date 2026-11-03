import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { formatPrice } from "../lib/utils";
import type { property } from "../types";

export default function FeaturedCard({ property }: { property: property }) {
  const router = useRouter();
  const imageUrl = property.images[0];

  return (
    <TouchableOpacity
      className="w-72 mr-2 rounded-3xl overflow-hidden bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        opacity: property.is_sold ? 0.5 : 1,
      }}
      onPress={() =>
        router.push({
          pathname: "/(root)/property/[id]",
          params: { id: property.id },
        })
      }
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: 176 }}
          contentFit="cover"
          accessibilityLabel={property.title}
        />
      ) : (
        <View className="h-44 w-full bg-gray-200" />
      )}

      <View className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full">
        <Text className="text-xs font-semibold text-blue-600 capitalize">
          {property.type}
        </Text>
      </View>

      {/* Sold Badge */}
      {property.is_sold && (
        <View className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-white">Sold</Text>
        </View>
      )}

      <View className="p-4">
        <Text
          className="text-base font-bold text-gray-800 mb-1"
          numberOfLines={1}
        >
          {property.title}
        </Text>

        <View className="flex-row items-center gap-1 mb-3">
          <Ionicons name="location-outline" size={13} color="black" />
          <Text className="text-xs text-gray-600" numberOfLines={1}>
            {property.address}, {property.city}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-between">
            <Text className="text-blue-600 font-bold text-base">
              {formatPrice(property.price)}
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="bed-outline" size={13} color="black" />
              <Text className="text-xs text-gray-500">{property.bedrooms}</Text>
            </View>

            <View className="flex-row items-center gap-1">
              <Ionicons name="water-outline" size={13} color="black" />
              <Text className="text-xs text-gray-500">
                {property.bathrooms}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

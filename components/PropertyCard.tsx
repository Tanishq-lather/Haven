import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { formatPrice } from "../lib/utils";

export default function PropertyCard({
  property,
  onUnsave,
  showSave = false,
}: {
  property: Property;
  onSave?: () => void;
  showSave?: boolean;
}) {
  const router = useRouter();
  const imageUrl = property.images[0];

  const isSaved = true;

  return (
    <TouchableOpacity
      className="flex-row mb-4 rounded-2xl overflow-hidden bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        opacity: property.is_sold ? 0.5 : 1,
      }}
      onPress={() => router.push(`/(root)/property/${property.id}`)}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{ width: 112, height: 112 }}
        contentFit="cover"
        accessibilityLabel={property.title}
      />

      <View className="flex-1 p-3 justify-between">
        <View>
          <Text
            className="text-sm font-bold text-gray-800 mb-1"
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
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-blue-600 font-bold text-sm">
            {formatPrice(property.price)}
          </Text>

          {property.is_sold && (
            <View className="bg-red-50 px-2 py-0.5 rounded-full">
              <Text className="text-red-500 text-xs font-semibold">Sold</Text>
            </View>
          )}
          <View className="flex-row gap-3">
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1">
                <Ionicons name="bed-outline" size={11} color="black" />
                <Text className="text-xs text-gray-500">
                  {property.bedrooms}
                </Text>
              </View>

              <View className="flex-row items-center gap-1">
                <Ionicons name="expand-outline" size={11} color="black" />
                <Text className="text-xs text-gray-500">
                  {property.area_sqft} sqft
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity className="w-10 items-center pt-3">
        <Ionicons
          name={isSaved ? "heart" : "heart-outline"}
          size={20}
          color={isSaved ? "#E54444" : "black"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

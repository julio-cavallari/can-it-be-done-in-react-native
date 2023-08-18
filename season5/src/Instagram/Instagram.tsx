import { useNavigation } from "@react-navigation/native";
import { Canvas, useImage, Image } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, View } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";

import type { Routes } from "../Routes";

import { ModalButton } from "./ModalButton";
import { ShareButton } from "./ShareButton";
import zurich from "./assets/zurich.jpg";
import { useStickerContext } from "./StickerContext";
import { GestureHandler } from "./GestureHandler";
const { width, height } = Dimensions.get("window");
const iconSize = 64;

export const Instagram = () => {
  const { stickers } = useStickerContext();
  const { navigate } = useNavigation<StackNavigationProp<Routes>>();
  const image = useImage(zurich);
  if (!image) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }}>
        <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={height}
          fit="cover"
        />
        {stickers.map(({ Sticker, matrix }, index) => {
          return <Sticker key={index} matrix={matrix} />;
        })}
      </Canvas>
      {stickers.map(({ size, matrix }, index) => {
        return <GestureHandler key={index} matrix={matrix} size={size} />;
      })}
      <ModalButton size={iconSize} onPress={() => navigate("StickerModal")} />
      <ShareButton size={iconSize} onPress={() => {}} />
    </View>
  );
};

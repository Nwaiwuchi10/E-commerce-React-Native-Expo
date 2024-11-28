import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
// import { Product } from "@/assets/types/product";
import { Image } from "react-native";
import { Product } from "@/assets/types/product";

const ProductListItem = ({ product }: { product: Product }) => {
  return (
    <Pressable style={styles.item}>
      <View style={styles.itemImageContainer}>
        <Image source={product.heroImage} style={styles.itemImage} />
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{product.title} </Text>
        <Text style={styles.itemPrice}>${product.price.toFixed(2)} </Text>
      </View>
    </Pressable>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  item: {
    // width: "40%",
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 6,
    overflow: "hidden",
  },
  itemImageContainer: {
    borderRadius: 10,
    width: 150,
    // width: "100%",
    height: 150,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    // resizeMode: "cover",
  },
  itemTextContainer: {
    padding: 8,
    alignItems: "flex-start",
    gap: 4,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: "bold",
  },
});

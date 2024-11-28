import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import ProductListItem from "@/components/Products/Products";
import { PRODUCTS } from "@/assets/products";

const Home = () => {
  return (
    <View>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => (
          <View>
            <ProductListItem product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<Text>Products</Text>}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumn: {
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

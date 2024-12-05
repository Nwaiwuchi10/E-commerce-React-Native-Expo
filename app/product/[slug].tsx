import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { PRODUCTS } from "@/assets/products";
import { useCartStore } from "@/store/cart-store";
import { FontAwesome } from "@expo/vector-icons";
import Header from "@/components/Header/Header";

const ProductDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const toast = useToast();
  const product = PRODUCTS.find((product) => product.slug === slug);
  if (!product) return <Redirect href="/+not-found" />;

  const { items, addItem, incrementItem, decrementItem } = useCartStore();
  const cartItem = items.find((item) => item.id === product.id);
  const initialQuantity = cartItem ? cartItem.quantity : 1;
  const [quantity, setQuantity] = useState(initialQuantity);
  const increaseQuantity = () => {
    if (quantity < product.maxQuantity) {
      setQuantity((prev) => prev + 1);
      incrementItem(product.id);
    } else {
      toast.show("Cannot add more than maximun quantity", {
        type: "warning",
        placement: "top",
      });
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      decrementItem(product.id);
    }
  };
  const addToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      heroImage: product.heroImage,
      price: product.price,
      quantity,
    });
    toast.show("Added to cart", {
      type: "success",
      placement: "top",
      duration: 1500,
    });
  };
  const totalPrice = (product.price * quantity).toFixed(2);
  const { getItemCount } = useCartStore();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.title }} />
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Header />
      </View>
      <Image source={product.heroImage} style={styles.heroImage} />
      <View>
        <FlatList
          data={product.imagesUrl}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.image} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imagesContainer}
        />
      </View>
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.title}>Title: {product.title}</Text>
        <Text style={styles.slug}>Slug: {product.slug}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            Unit Price: ${product.price.toFixed(2)}
          </Text>
          <Text style={styles.price}>Total Price: ${totalPrice}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity} </Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={increaseQuantity}
            disabled={quantity >= product.maxQuantity}
          >
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              { opacity: quantity === 0 ? 0.5 : 1 },
            ]}
            onPress={addToCart}
            disabled={quantity === 0}
          >
            <Text style={styles.addToCartText}> Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  slug: {
    fontSize: 18,
    color: "#555",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  price: {
    fontWeight: "bold",
    color: "#000",
  },

  imagesContainer: {
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 18,
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
  },
  /////
  headerContainer: {
    gap: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  cartContainer: {
    padding: 10,
  },
  signOutButton: {
    padding: 10,
  },
  heroContainer: {
    width: "100%",
    height: 200,
  },

  categoriesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    width: 100,
    alignItems: "center",
    marginBottom: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {},
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: 10,
    backgroundColor: "#1BC464",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

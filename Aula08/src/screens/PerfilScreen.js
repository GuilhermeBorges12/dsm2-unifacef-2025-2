// src/screens/PerfilScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const AVATAR_PLACEHOLDER =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

export default function PerfilScreen() {
  const [avatarUri, setAvatarUri] = useState(null);

  // Pedir permissões ao montar
  useEffect(() => {
    (async () => {
      // Galeria
      const lib = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!lib.granted) {
        Alert.alert("Permissão necessária", "Precisamos da sua permissão para acessar a galeria.");
      }
      // Câmera
      const cam = await ImagePicker.requestCameraPermissionsAsync();
      if (!cam.granted) {
        // Emulador web/PC pode não ter câmera – tudo bem.
        if (Platform.OS !== "web") {
          Alert.alert("Permissão necessária", "Precisamos da sua permissão para usar a câmera.");
        }
      }
    })();
  }, []);

  // Abrir câmera
  const abrirCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: true,
        aspect: [1, 1], // recorte quadrado para avatar
      });
      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert("Erro", "Não foi possível abrir a câmera.");
    }
  };

  // Abrir galeria
  const abrirGaleria = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert("Erro", "Não foi possível acessar a galeria.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil do Usuário</Text>

      <Image
        source={{ uri: avatarUri || AVATAR_PLACEHOLDER }}
        style={styles.avatar}
      />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={abrirCamera}>
          <Text style={styles.btnText}>Tirar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnAlt]} onPress={abrirGaleria}>
          <Text style={styles.btnText}>Escolher da Galeria</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.dica}>Dica: use uma foto quadrada para melhor recorte.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 40, paddingHorizontal: 16 },
  titulo: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,             // círculo 😎
    borderWidth: 3,
    borderColor: "#e5e5e5",
    backgroundColor: "#f5f5f5",
  },
  actions: { flexDirection: "row", gap: 12, marginTop: 24 },
  btn: { backgroundColor: "#0ea5e9", paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 },
  btnAlt: { backgroundColor: "#16a34a" },
  btnText: { color: "#fff", fontWeight: "700" },
  dica: { marginTop: 16, color: "#666" },
});

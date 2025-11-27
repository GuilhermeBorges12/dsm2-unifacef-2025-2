// src/screens/PaginaInicial.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PaginaInicial({ navigation }) {
  return (
    <View style={s.container}>
      <View style={s.content}>
        <View style={s.center}>
          <Text style={s.title}>Agenda do dia</Text>
          <Text style={s.sub}>(Guilherme Borges)</Text>
          <Text style={s.sub}>(Engenharia de Software)</Text>
        </View>

        <View style={s.col}>
          <TouchableOpacity
            style={s.btnGray}
            onPress={() => navigation.navigate("CompromissoTela")}
          >
            <Text style={s.btnTxt}>Meus compromissos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.btnGray}
            onPress={() => navigation.navigate("CompromissoTime")}
          >
            <Text style={s.btnTxt}>Compromissos da equipe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    maxWidth: 420,
    alignItems: "center",
  },
  center: {
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 6, textAlign: "center" },
  sub: { color: "#555", marginVertical: 2, fontStyle: "italic", textAlign: "center" },

  col: { gap: 10, marginTop: 8, marginBottom: 24, alignItems: "center", width: "100%" },

  // botões mais "curtos" e com menos padding
  btnGray: {
    backgroundColor: "#9CA3AF",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    width: "55%",     // antes 80% → agora mais estreito
    maxWidth: 220,    // trava o máximo em telas grandes
  },
  btnTxt: { color: "#fff", fontWeight: "700", fontSize: 15 },
});

// src/screens/CompromissoTime.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SECOES = [
  {
    title: "(EU)",
    data: [
      { hora: "09:30", texto: 'Reunião “Daily”' },
      { hora: "14:00", texto: "Reunião com cliente Carros & Carros" },
      { hora: "16:30", texto: "Prazo final Projeto X" },
    ],
  },
  {
    title: "Jurema (Chefe)",
    data: [
      { hora: "09:30", texto: 'Reunião “Daily”' },
      { hora: "12:00", texto: "Acordo com diretoria" },
      { hora: "15:00", texto: "Saída viagem" },
      { hora: "16:30", texto: "Prazo final Projeto X" },
    ],
  },
  {
    title: "Aderbal",
    data: [
      { hora: "09:30", texto: 'Reunião “Daily”' },
      { hora: "11:30", texto: "Visita técnica Uni-FACEF" },
      { hora: "16:30", texto: "Prazo final Projeto X" },
    ],
  },
];

export default function CompromissoTime() {
  return (
    <View style={s.container}>
      {/* topo: (EU) + nome + turma */}
      <View style={s.headerTop}>
        <Text style={s.euTitle}>(EU)</Text>
        <Text style={s.euLine}>Guilherme Borges</Text>
        <Text style={s.euLine}>Engenharia de Software</Text>
      </View>

      {/* seções compactas, sem scroll */}
      <View style={s.sectionsWrap}>
        {SECOES.map((sec) => (
          <View key={sec.title} style={s.section}>
            <Text style={s.header}>{sec.title}</Text>
            {sec.data.map((item, idx) => (
              <Text key={`${sec.title}-${idx}`} style={s.itemLine}>
                {item.hora} {item.texto}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },

  headerTop: { alignItems: "center", marginBottom: 6 },
  euTitle: { fontWeight: "800", fontSize: 16, marginBottom: 2, textAlign: "center" },
  euLine: { color: "#444", textAlign: "center", fontSize: 14, lineHeight: 18 },

  sectionsWrap: { flex: 1, justifyContent: "space-between" },

  section: {},

  header: {
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 2, // título mais colado
    lineHeight: 18,
  },

  // ainda mais compacto entre os compromissos
  itemLine: {
    fontSize: 14,
    marginBottom: 2,  // antes 4 → agora 2
    lineHeight: 18,   // reduz a altura da linha
  },
});

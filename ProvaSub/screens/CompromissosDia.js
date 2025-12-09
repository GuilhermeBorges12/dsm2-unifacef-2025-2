import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import compromissos from "../data/compDia";

const NOME = "Guilherme Borges Rocha";
const TURMA = "Engenharia de Software";

export default function CompromissosDia() {
  return (
    <View style={s.container}>
      <Text style={s.title}>Compromissos do dia</Text>
      <Text style={s.sub}>({NOME})</Text>
      <Text style={s.sub}>({TURMA})</Text>

      <FlatList
        data={compromissos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Text style={s.item}>{item.descr}</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 8 }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container:{ flex:1, backgroundColor:"#fff", padding:20 },
  title:{ fontSize:22, fontWeight:"800", textAlign:"center", marginBottom:4 },
  sub:{ textAlign:"center", color:"#444" },
  item:{ fontSize:16 },
});

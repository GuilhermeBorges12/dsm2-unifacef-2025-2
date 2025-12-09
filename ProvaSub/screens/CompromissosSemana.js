import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import secoes from "../data/compSemana";

const NOME = "Guilherme Borges Rocha";
const TURMA = "Engenharia de Software";

export default function CompromissosSemana() {
  const sections = secoes.map((sec) => ({ title: sec.titulo, data: sec.dados }));

  return (
    <View style={s.container}>
      <View style={s.top}>
        <Text style={s.topTxt}>({NOME})</Text>
        <Text style={s.topTxt}>({TURMA})</Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section }) => <Text style={s.header}>{section.title}</Text>}
        renderItem={({ item }) => <Text style={s.item}>{item}</Text>}
        stickySectionHeadersEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        contentContainerStyle={{ paddingBottom: 8 }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container:{ flex:1, backgroundColor:"#fff", padding:16 },
  top:{ alignItems:"center", marginBottom:8 },
  topTxt:{ color:"#444" },
  header:{ textAlign:"center", fontWeight:"800", fontSize:16, marginTop:10, marginBottom:4 },
  item:{ fontSize:14 },
});

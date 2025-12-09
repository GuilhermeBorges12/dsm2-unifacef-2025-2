import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const NOME = "Guilherme Borges Rocha";
const TURMA = "Engenharia de Software";

export default function Home({ navigation }) {
  return (
    <View style={s.container}>
      <View style={s.center}>
        <Text style={s.title}>Agenda</Text>
        <Text style={s.sub}>({NOME})</Text>
        <Text style={s.sub}>({TURMA})</Text>
      </View>

      <View style={s.col}>
        <TouchableOpacity style={s.btn} onPress={() => navigation.navigate("Compromissos do dia")}>
          <Text style={s.btnTxt}>COMPROMISSOS DO DIA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btn} onPress={() => navigation.navigate("Compromissos da semana")}>
          <Text style={s.btnTxt}>COMPROMISSOS DA SEMANA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container:{ flex:1, backgroundColor:"#fff", padding:20, paddingTop:24 },
  center:{ flex:1, alignItems:"center", justifyContent:"center" },
  title:{ fontSize:24, fontWeight:"800", marginBottom:8 },
  sub:{ color:"#555", fontStyle:"italic", marginVertical:2 },
  col:{ gap:10, marginBottom:24, alignItems:"center" },
  btn:{ backgroundColor:"#9CA3AF", paddingVertical:10, paddingHorizontal:12, borderRadius:6, width:"70%", maxWidth:280, alignItems:"center" },
  btnTxt:{ color:"#fff", fontWeight:"700" },
});

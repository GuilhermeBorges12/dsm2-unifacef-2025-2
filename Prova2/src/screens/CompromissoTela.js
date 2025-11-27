import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ITENS = [
  { hora: "09:30", texto: 'Reunião “Daily”', nota: "" },
  { hora: "14:00", texto: "Reunião com cliente Carros & Carros", nota: "" },
  { hora: "16:30", texto: "Prazo final Projeto X", nota: "" },
];

export default function CompromissoTela() {
  return (
    <View style={s.container}>
      {/* topo: apenas texto, sem borda/fundo */}
      <View style={s.headerWrap}>
        <Text style={s.euTitle}>(EU)</Text>
        <Text style={s.euLine}>Guilherme Borges</Text>
        <Text style={s.euLine}>Engenharia de Software</Text>
      </View>

      {/* lista: hora + texto na mesma linha; nota (opcional) abaixo */}
      <View style={s.lista}>
        {ITENS.map((it) => (
          <View key={it.hora} style={s.item}>
            <Text style={s.itemLine}>
              {it.hora} {it.texto}
            </Text>
            {!!it.nota && <Text style={s.nota}>{it.nota}</Text>}
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },

  headerWrap: { alignItems: "center", marginBottom: 12 },
  euTitle: { fontWeight: "800", fontSize: 16, marginBottom: 4, textAlign: "center" },
  euLine: { color: "#444", textAlign: "center" },

  lista: { marginTop: 8, width: "100%" },

  // bloco de cada compromisso com um espaço 
  item: { marginBottom: 14 },

  // linha principal (hora + texto) em uma linha, sem negrito
  itemLine: { fontSize: 16, marginBottom: 4 },

  // segunda linha opcional (nota), mais discreta
  nota: { fontSize: 14, color: "#6B7280" },
});

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import CompromissosDia from "./screens/CompromissosDia";
import CompromissosSemana from "./screens/CompromissosSemana";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Home} />
        <Stack.Screen name="Compromissos do dia" component={CompromissosDia} />
        <Stack.Screen name="Compromissos da semana" component={CompromissosSemana} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

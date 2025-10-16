// App.js
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* =========================
   Helpers
========================= */
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function formatPhoneBR(digits) {
  // Formata celular BR: (DD) 9XXXX-XXXX ou (DD) XXXX-XXXX conforme tamanho
  const d = digits.replace(/\D/g, "");
  if (d.length <= 10) {
    // fixo: (DD) XXXX-XXXX
    return d.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) =>
      [a && `(${a})`, b, c && `-${c}`].filter(Boolean).join(" ")
    );
  }
  // celular: (DD) 9XXXX-XXXX
  return d.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, (_, a, b, c) =>
    [a && `(${a})`, b, c && `-${c}`].filter(Boolean).join(" ")
  );
}

/* =========================
   Tela de Cadastro (Desafio)
========================= */
function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [tel, setTel] = useState("");

  // Erros campo a campo
  const [erros, setErros] = useState({
    nome: "",
    email: "",
    senha: "",
    confSenha: "",
    tel: "",
  });

  // Regras
  const onlyDigits = (t) => t.replace(/\D/g, "");

  const validar = () => {
    const novo = { nome: "", email: "", senha: "", confSenha: "", tel: "" };

    // Nome
    if (!nome.trim()) novo.nome = "Informe seu nome completo.";

    // Email
    if (!email.trim()) novo.email = "Informe seu e-mail.";
    else if (!emailRegex.test(email)) novo.email = "E-mail inválido.";

    // Senha
    if (senha.length < 6) novo.senha = "Mínimo de 6 caracteres.";

    // Confirmar senha
    if (confSenha !== senha) novo.confSenha = "As senhas não coincidem.";

    // Telefone (apenas números). Não obrigo tamanho fixo, mas você pode exigir 10/11.
    const telDigits = onlyDigits(tel);
    if (!telDigits) novo.tel = "Informe seu telefone (apenas números).";
    else if (telDigits.length < 10 || telDigits.length > 11)
      novo.tel = "Telefone deve ter 10 ou 11 dígitos.";

    setErros(novo);
    // Se nenhum erro preenchido
    return Object.values(novo).every((v) => v === "");
  };

  const isFormValido = useMemo(() => {
    // Habilita o botão quando há preenchimento básico (UX melhor)
    return (
      nome.trim() &&
      emailRegex.test(email) &&
      senha.length >= 6 &&
      confSenha === senha &&
      onlyDigits(tel).length >= 10 &&
      onlyDigits(tel).length <= 11
    );
  }, [nome, email, senha, confSenha, tel]);

  const handleSubmit = () => {
    if (!validar()) return;

    const payload = {
      nome: nome.trim(),
      email: email.trim(),
      telefoneDigits: onlyDigits(tel),
      telefoneFormatado: formatPhoneBR(onlyDigits(tel)),
    };

    navigation.navigate("Resultado", payload);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Cadastro</Text>

        {/* Nome */}
        <TextInput
          style={[styles.input, erros.nome && styles.inputErro]}
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
          returnKeyType="next"
        />
        {!!erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}

        {/* E-mail */}
        <TextInput
          style={[styles.input, erros.email && styles.inputErro]}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
          textContentType="emailAddress"
        />
        {!!erros.email && <Text style={styles.erro}>{erros.email}</Text>}

        {/* Senha */}
        <TextInput
          style={[styles.input, erros.senha && styles.inputErro]}
          placeholder="Senha (mín. 6)"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          returnKeyType="next"
          textContentType="password"
        />
        {!!erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}

        {/* Confirmar senha */}
        <TextInput
          style={[styles.input, erros.confSenha && styles.inputErro]}
          placeholder="Confirmar senha"
          secureTextEntry
          value={confSenha}
          onChangeText={setConfSenha}
          returnKeyType="done"
          textContentType="password"
        />
        {!!erros.confSenha && <Text style={styles.erro}>{erros.confSenha}</Text>}

        {/* Telefone */}
        <TextInput
          style={[styles.input, erros.tel && styles.inputErro]}
          placeholder="Telefone (apenas números)"
          keyboardType="numeric" // Regra 1
          value={formatPhoneBR(tel.replace(/\D/g, ""))}
          onChangeText={(t) => setTel(onlyDigits(t))}
          maxLength={16} // limita a máscara exibida
          returnKeyType="done"
        />
        {!!erros.tel && <Text style={styles.erro}>{erros.tel}</Text>}

        <TouchableOpacity
          style={[styles.botao, !isFormValido && styles.botaoDesabilitado]}
          onPress={handleSubmit}
          disabled={!isFormValido}
        >
          <Text style={styles.botaoTexto}>Finalizar cadastro</Text>
        </TouchableOpacity>

        <Text style={styles.obs}>
          * O telefone aceita apenas números e é formatado automaticamente.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* =========================
   Tela de Resultado
========================= */
function ResultadoScreen({ route, navigation }) {
  const { nome, email, telefoneDigits, telefoneFormatado } = route.params ?? {};

  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <Text style={styles.titulo}>Dados enviados</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.valor}>{nome}</Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.valor}>{email}</Text>

        <Text style={styles.label}>Telefone (formatado)</Text>
        <Text style={styles.valor}>{telefoneFormatado}</Text>

        <Text style={styles.label}>Telefone (apenas dígitos)</Text>
        <Text style={styles.valor}>{telefoneDigits}</Text>
      </View>

      <TouchableOpacity
        style={[styles.botao, { marginTop: 16 }]}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.botaoTexto}>Voltar ao cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

/* =========================
   Navegação
========================= */
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ title: "Desafio - Cadastro" }}
        />
        <Stack.Screen
          name="Resultado"
          component={ResultadoScreen}
          options={{ title: "Resultado" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* =========================
   Estilos
========================= */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  inputErro: {
    borderColor: "#e53935",
  },
  erro: {
    color: "#e53935",
    marginBottom: 8,
    marginLeft: 4,
  },
  botao: {
    backgroundColor: "#0ea5e9",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  obs: {
    color: "#666",
    fontSize: 12,
    marginTop: 12,
    textAlign: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fafafa",
    gap: 4,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  valor: {
    fontSize: 16,
    fontWeight: "600",
  },
});


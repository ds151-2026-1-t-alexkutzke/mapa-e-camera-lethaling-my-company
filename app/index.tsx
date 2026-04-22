import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// TODO: Importar expo-camera, expo-location e async-storage

export default function NovoSegredoScreen() {
  const [texto, setTexto] = useState('');
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Lógica do botão de abrir câmera
  const handleAbrirCamera = async () => {
    // TODO 1: Pedir permissão da câmera
    // Se permitido, abrir a câmera mudando o estado:
    setIsCameraOpen(true);
  };

  // Lógica após tirar a foto
  const handleTirarFoto = async () => {
    // TODO 2: Usar o cameraRef para tirar a foto
    // Salvar a URI no estado setFotoUri e fechar a câmera
    Alert.alert("Dica", "Implemente a captura da foto aqui!");
    setIsCameraOpen(false);
  };

  // Lógica de salvar no armazenamento local
  const handleSalvarSegredo = async () => {
    if (!texto) {
      Alert.alert('Erro', 'Digite um segredo primeiro!');
      return;
    }

    // TODO 3: Buscar a localização atual do usuário (GPS)

    // TODO 4: Montar o objeto do segredo e salvar no AsyncStorage
    Alert.alert("Sucesso", "Implemente o AsyncStorage aqui!");

    setTexto('');
    setFotoUri(null);
  };

  // --- RENDERIZAÇÃO DA CÂMERA EM TELA CHEIA ---
  if (isCameraOpen) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff', marginTop: 50, textAlign: 'center' }}>
          {/* TODO: Substituir esta View pelo componente <CameraView> */}
          (Câmera deve aparecer aqui)
        </Text>

        <View style={styles.cameraOverlay}>
          <TouchableOpacity style={styles.btnCapturar} onPress={handleTirarFoto}>
            <Text style={styles.btnText}>Capturar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCancelar} onPress={() => setIsCameraOpen(false)}>
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- RENDERIZAÇÃO DO FORMULÁRIO NORMAL ---
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Qual o seu segredo neste local?</Text>

      <TextInput
        style={styles.input}
        placeholder="Escreva algo marcante..."
        placeholderTextColor="#666"
        value={texto}
        onChangeText={setTexto}
        multiline
      />

      <View style={styles.fotoContainer}>
        {fotoUri ? (
          <Image source={{ uri: fotoUri }} style={styles.previewFoto} />
        ) : (
          <TouchableOpacity style={styles.btnFotoOutline} onPress={handleAbrirCamera}>
            <Text style={styles.btnFotoText}>📷 Adicionar Foto ao Segredo</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvarSegredo}>
        <Text style={styles.btnSalvarText}>Salvar Segredo e Localização 📍</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e1e', padding: 20 },
  label: { color: '#fff', fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
  input: { backgroundColor: '#333', color: '#fff', padding: 15, borderRadius: 8, minHeight: 100, textAlignVertical: 'top' },
  fotoContainer: { marginVertical: 20, alignItems: 'center' },
  previewFoto: { width: '100%', height: 200, borderRadius: 8 },
  btnFotoOutline: { borderWidth: 1, borderColor: '#007bff', borderStyle: 'dashed', padding: 30, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnFotoText: { color: '#007bff', fontSize: 16 },
  btnSalvar: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnSalvarText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cameraOverlay: { flex: 1, justifyContent: 'space-evenly', paddingBottom: 40, flexDirection: 'row', alignItems: 'flex-end' },
  btnCapturar: { backgroundColor: '#28a745', padding: 15, borderRadius: 30 },
  btnCancelar: { backgroundColor: '#dc3545', padding: 15, borderRadius: 30 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});

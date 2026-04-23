import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, Modal, Pressable, Image } from 'react-native';
import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps';
import * as Location from 'expo-location'
// TODO: Importar AsyncStorage

// Define o formato que o segredo terá
export interface Segredo {
  id: string;
  texto: string;
  fotoUri: string | null;
  latitude: number;
  longitude: number;
}

export default function MapaScreen() {
  const [segredos, setSegredos] = useState<Segredo[]>([]);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [segredoSelecionado, setSegredoSelecionado] = useState<Segredo>();


  // Carrega os dados toda vez que a tela é aberta
  useEffect(() => {
    carregarSegredos();


    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("erro", "permissão de localização não dada")
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

    })();

  }, []);

  const carregarSegredos = async () => {
    // TODO 5: Ler a lista de segredos do AsyncStorage, fazer JSON.parse() e colocar no estado setSegredos.

    const getData = async (key: string): Promise<Segredo> => {
      const JsonValue = await AsyncStorage.getItem(key);
      return JSON.parse(JsonValue!) as Segredo;
    }

    let segredos: Segredo[] = [];
    const keys = await AsyncStorage.getAllKeys();

    for (const key of keys) {
      segredos.push(await getData(key))
    }

    setSegredos(segredos);
    console.log(segredos);
  };

  if (!location) {
    return (
      <View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* TODO 6: O MapView precisa receber o initialRegion ou region */}

      <Modal
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => { setModalVisivel(false) }}
      >
        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <Text style={styles.modalText}>{segredoSelecionado?.texto}</Text>
            <Image
              source={{ uri: segredoSelecionado?.fotoUri ? segredoSelecionado.fotoUri : "" }}
              style={{ width: "50%", height: "50%" }}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisivel(!modalVisivel)}>
              <Text style={styles.textStyle}>fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01
        }}
      >

        {/* TODO 7: Fazer um map() no array de segredos para criar os Markers */}
        {segredos.map((segredo) => (
          <Marker
            key={segredo.id}
            coordinate={{ latitude: segredo.latitude, longitude: segredo.longitude }}
            onPress={() => {
              setSegredoSelecionado(segredo);
              setModalVisivel(true);
            }}
          />
        ))}

      </MapView>

      {segredos.length === 0 && (
        <View style={styles.avisoContainer}>
          <Text style={styles.avisoText}>Nenhum segredo salvo ainda. Vá na outra aba!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  calloutContainer: { width: 150, padding: 5 },
  calloutText: { fontWeight: 'bold', textAlign: 'center' },
  avisoContainer: { position: 'absolute', top: 50, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: 10, borderRadius: 20 },
  avisoText: { color: '#fff' },

  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalView: {
    margin: 0, backgroundColor: 'white', borderRadius: 20,
    padding: 10, alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000',
    width: '80%',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25, shadowRadius: 4, elevation: 5
  },
  button: { borderRadius: 20, padding: 10, elevation: 2 },
  buttonClose: { backgroundColor: '#2196F3' },
  textStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  modalText: { marginBottom: 15, textAlign: 'center' },
});

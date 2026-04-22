import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#007bff',
      headerStyle: { backgroundColor: '#121212' },
      headerTintColor: '#fff',
      tabBarStyle: { backgroundColor: '#121212', borderTopColor: '#333' }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Novo Segredo',
          tabBarIcon: ({ color }) => <FontAwesome name="lock" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Meu Mapa',
          tabBarIcon: ({ color }) => <FontAwesome name="map" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

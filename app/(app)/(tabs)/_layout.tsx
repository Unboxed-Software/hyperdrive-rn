import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { Text } from '../../../components/Themed';
import Colors from '../../../constants/Colors';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const ProfileButton = () => (
  <Link style={{ marginEnd: 30 }} href="/me">
    <Text>Show Profile</Text>
  </Link>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => <ProfileButton />,
        }}
      />
      <Tabs.Screen
        name="virtual-addresses"
        options={{
          title: 'Your Addresses',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => <ProfileButton />,
        }}
      />
    </Tabs>
  );
}

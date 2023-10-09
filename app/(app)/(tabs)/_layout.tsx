import { Text } from '@components/Themed';
import Colors from '@consts/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Avatar, AvatarFallbackText, AvatarImage, Pressable } from '@gluestack-ui/themed';
import { Link, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { useSession } from '@/ctx/auth';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const ProfileButton = ({ image, name }: { image?: string; name: string }) => (
  <Link style={{ marginEnd: 30 }} href="/me" asChild>
    <Pressable>
      <Avatar size="sm">
        <AvatarFallbackText>{name}</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: image,
          }}
        />
      </Avatar>
    </Pressable>
  </Link>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { user } = useSession();

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
          headerRight: () => <ProfileButton image={user?.image} name={user?.name || ''} />,
        }}
      />
      <Tabs.Screen
        name="virtual-addresses"
        options={{
          title: 'Your Addresses',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => <ProfileButton image={user?.image} />,
        }}
      />
    </Tabs>
  );
}

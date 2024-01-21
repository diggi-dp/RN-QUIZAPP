import { Tabs, useFocusEffect } from "expo-router"
import { FontAwesome5 } from '@expo/vector-icons'
import { COLORS } from "../../constants/theme"



const TabLayout = () => {
 

    return (
        <Tabs >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: 'Home',
                    tabBarActiveTintColor: COLORS.light,
                    headerShown:false,
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
                    tabBarStyle: { padding: 10, height: 62, backgroundColor: COLORS.darkBlue },
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={24} color={color} />,

                }}
            />
            <Tabs.Screen
                name="quizes"
                options={{
                    tabBarLabel: 'Quizes',
                    headerShown:false,
                    tabBarActiveTintColor: COLORS.light,
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
                    tabBarStyle: { padding: 10, height: 62, backgroundColor: COLORS.darkBlue },
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="list" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarActiveTintColor: COLORS.light,
                    headerShown: false,
                    // tabBarBadge:true,
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
                    tabBarStyle: { padding: 10, height: 62, backgroundColor: COLORS.darkBlue },
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="user" size={24} color={color} />
                }}
            />


        </Tabs>
    )
}

export default TabLayout
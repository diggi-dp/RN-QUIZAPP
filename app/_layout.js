import { SplashScreen, Stack } from "expo-router"
import { COLORS } from "../constants/theme"
import { useCallback, useEffect, useState } from "react"
import SplashscreenComponent from './SplashscreenComponent'
import { Provider } from "react-redux"
import store from "../redux/store"
import Toast from "../components/common/Toast"
import * as Updates from 'expo-updates';



SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [appIsReady, setAppIsReady] = useState(false)

    useEffect(() => {
        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000))

            } catch (error) {
                console.warn(error)
            } finally {
                setAppIsReady(true);
                // await SplashScreen.hideAsync();
            }
        }
        prepare()
    }, [])

    useEffect(() => {
        if (appIsReady) {
            console.log('called')
            SplashScreen.hideAsync();
        }
    }, [appIsReady])

    // const onLayoutRootView = useCallback(async () => {
    //     if (appIsReady) {
    //         console.log('called')
    //         await SplashScreen.hideAsync();
    //     }
    // }, [appIsReady])


    async function handleAppUpdate() {
        try {
            const { isAvailable } = await Updates.checkForUpdateAsync();
            if (isAvailable) {
                await Updates.fetchUpdateAsync();
                Updates.reloadAsync();
            }
        } catch (error) {
            console.error("Error checking for app updates:", error);
        }
    }

    // Handle OTA update on app launch
    useEffect(() => {
        handleAppUpdate();
    }, []);


    if (!appIsReady) {
        return null
    }

    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="login"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="register"
                    options={{
                        headerStyle: {
                            backgroundColor: COLORS.darkBlue
                        },
                        headerTintColor: 'white',
                        headerShadowVisible: false,
                        headerTitle: '',
                    }}
                />
                <Stack.Screen
                    name='(tab)'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='Error'
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>

            <Toast
                duration={2000}
            />

        </Provider>
    )
}

export default RootLayout




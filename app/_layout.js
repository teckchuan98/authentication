import { Stack } from "expo-router";

const Layout = ()=>{
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerTitle:"", headerShadowVisible: false, headerStyle: {
                    backgroundColor: "#DDD9D9"
                }
            }}/>
        </Stack>
    )
}

export default Layout;
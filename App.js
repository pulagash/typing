import React from "react"
import HomeScreen from "./Homescreen"
import TypingSpeedApp from "./TypingSpeedApp"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

const Stack = createStackNavigator()

const App = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="TypingSpeedApp" component={TypingSpeedApp} />
          </Stack.Navigator>
      </NavigationContainer>
  )
}
export default App

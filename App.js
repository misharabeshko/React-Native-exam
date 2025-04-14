import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CurrencySelectionScreen from './screens/CurrencySelectionScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="CurrencySelection"
              component={CurrencySelectionScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#2b2b2b',
                },
                headerTintColor: '#fff',
                headerTitle: 'Валюти',
              }}
            />

          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    // backgroundColor: '#fff',
  },
});

export default App;

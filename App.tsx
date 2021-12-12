
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import React, { useRef } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { COLORS } from './constants/Theme';
import { AppContextProvider } from './context/appContext/App_State';
import { AuthContextConsumer, AuthContextProvider } from './context/authcontext/Auth_State';
import Dashboard from './screens/Dashboard';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import TransactionView from './screens/Transaction';
 


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Hiding Tab Names...
function Index(
  { navigation, back }: { navigation: any, back: any }
) {
  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  return (
    < >
      <Tab.Navigator tabBarOptions={{
        showLabel: false,
        // Floating Tab Bar...
        style: {
          backgroundColor: COLORS.PRI,
          position: 'absolute',
          bottom: 0,
          // marginHorizontal: 20,
          // Max Height...
          height: 60,

          // borderRadius: 10,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10
          },
          // paddingHorizontal: 20,
        }
      }}>

        {
          // Tab Screens....

          // Tab ICons....
        }
        <Tab.Screen name={"Dashboard"} component={Dashboard} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <MaterialIcons
                name="dashboard"
                size={20}
                color={focused ? '#fff' : COLORS.TXT}
              ></MaterialIcons>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

        <Tab.Screen name={"Search"} component={EmptyScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="search"
                size={20}
                color={focused ? '#fff' : COLORS.TXT}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>


        {

          // Extra Tab Screen For Action Button..
        }

        <Tab.Screen name={"ActionButton"} component={EmptyScreen} options={{
          tabBarIcon: ({ focused }) => (

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Transaction")
              }}>
              <View style={{
                borderWidth: 3,
                borderColor: "#fff",
                width: 65,
                height: 65,
                backgroundColor: COLORS.SEC,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: Platform.OS == "android" ? 50 : 30,
                // shadowColor: '#f0f0f0f0',
                // shadowOffset: {
                //   width: 0,
                //   height: 3
                // },
                // shadowRadius: 5,
                // shadowOpacity: 1.0,
              }}>
                <MaterialIcons
                  name="send"
                  size={30}
                  color={"#fff"}
                  style={styles.icon}
                />

              </View>
            </TouchableOpacity>
          )
        }}></Tab.Screen>

        <Tab.Screen name={"Notifications"} component={EmptyScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="bell"
                size={20}
                color={focused ? '#fff' : COLORS.TXT}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>



        <Tab.Screen name={"Settings"} component={EmptyScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="user-alt"
                size={20}
                color={focused ? '#fff' : COLORS.TXT}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 4,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

      </Tab.Navigator>

      {/* <Animated.View style={{
        width: getWidth() - 20,
        height: 2,
        backgroundColor: COLORS.TXT,
        position: 'absolute',
        bottom: 58,
        zIndex:1,
        // Horizontal Padding = 20...
        left: 50,
        borderRadius: 20,
        transform: [
          { translateX: tabOffsetValue }
        ]
      }}>

      </Animated.View> */}
    </ >
  );
}

function getWidth() {
  let width = Dimensions.get("window").width

  width = width - 80

  return width / 5
}

function EmptyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
}



const styles = StyleSheet.create({
  icon: {
    transform: [{ rotate: "-30deg" }],

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




  export default function App() {
  return (
    <AppContextProvider>

      <AuthContextProvider>

        <AuthContextConsumer>
          {(context) => {

            return (


              <NavigationContainer>
                <Stack.Navigator
                // initialRouteName="SignIn"
                // screenOptions={{
                //   // header: CustomNavigationBar,
                // }}
                >
                  {!context.isAuthenticated ? <>
                    <Stack.Screen name="SignIn" component={Signin} />
                    <Stack.Screen name="SignUp" component={Signup} />
                  </>
                    :
                    <>
                      <Stack.Screen name="Dashboard" component={Index} />
                      <Stack.Screen name="Transaction" component={TransactionView} />
                    </>
                  }
                </Stack.Navigator>
              </NavigationContainer>
            )
          }}
        </AuthContextConsumer>

      </AuthContextProvider>

    </AppContextProvider>
  );
}


 
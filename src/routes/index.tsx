import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Characters from "../screens/Characters";
import Episodes from "../screens/Episodes";
import Locations from "../screens/Locations";

export type RootBottomParamList = {
  Characters: undefined;
  Episodes: undefined;
  Locations: undefined;
};

export const Routes = () => {
  const Tab = createBottomTabNavigator<RootBottomParamList>();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Characters"
          component={Characters}
          options={{
            tabBarLabel: "Characters",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Episodes"
          component={Episodes}
          options={{
            tabBarLabel: "Episodes",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="tv" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Locations"
          component={Locations}
          options={{
            tabBarLabel: "Locations",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="globe" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import BannerAD from 'react-native-google-mobile-ads';
import requestPermissions from './src/utils/permissions';
import {AD_UNIT_ID } from '@env'; 
console.log('App component Rendered');
const App = () => {
  console.log('App Function Excuted');
  useEffect(() => {
    requestPermissions()
      .then(() => console.log('Permission granted'))
      .catch((err) => console.log('Permission error:', err));
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
        <BannerAD
          unitId={AD_UNIT_ID}
          size="BANNER"
          requestOptions={{ requestNonPersonalizeAdsOnly: true }}
        />
      </SafeAreaView>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerAd: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItem: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
});
export default App;

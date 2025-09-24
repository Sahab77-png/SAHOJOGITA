import { useEffect } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
const AppLinks = ({ navigation }) => {
  useEffect(() => {
    const handleDeepLink = (event) => {
      const url = event.url;
      if (url) {
        console.log('Deep link opened:', url);
        if (url.includes('specialPage')) {
          navigation.navigate('SpecialPage');
        }
      }
    };
    Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });
    return () => Linking.removeEventListener('url', handleDeepLink);
  }, [navigation]);
  return null;
};
AppLinks.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default AppLinks;

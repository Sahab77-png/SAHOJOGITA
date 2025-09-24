import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as RNLocalize from 'react-native-localize';
import Tts from 'react-native-tts';
import axios from 'axios';
import { messagesEn } from '../data/betterWorldMessages';
import { MICROSOFT_TRANSLATOR_KEY, MICROSOFT_REGION } from '@env';

const HomeScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [translatedMessage, setTranslatedMessage] = useState('');
  const [language, setLanguage] = useState('en');
  useEffect(() => {
    const locales = RNLocalize.getLocales();
    if (locales && locales.length > 0)
    {
      setLanguage(locales[0].languageCode);
    }
  }, []);
  useEffect(() => {
    const today = new Date().getDate();
    const index = today % messagesEn.length;
    const dailyMessage = messagesEn[index];
    setMessage(dailyMessage);
  }, []);
  useEffect(() => {
    if (!message) return;
    const fetchTranslation = async () => {
      if (language === 'en') {
        setTranslatedMessage(message);
        speak(message);
        return;
      }
      try {
        const response = await axios({
          method: 'post',
          url: 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${language}',
          headers: {
            'Ocp-Apim-Subscription-Key' : MICROSOFT_TRANSLATOR_KEY,
            'Ocp-Apim-Subscription-Region' : MICROSOFT_REGION,
            'Content-type': 'application/json',
          },
          data: [{ Text: message }],
        });
        const translatedText = response.data[0]?.translations[0]?.text || message;
        setTranslatedMessage(translatedText);
        speak(translatedText);
      } catch(error) {
        console.error('Translation error:', error);
        setTranslatedMessage(message);
        speak(message);
      }
    };
    fetchTranslation();
  }, [message, language]);
  const speak = (text) => {
    Tts.setDefaultRate(0.4);
    Tts.speak(text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{translatedMessage || message }</Text>
      <Button
       title="Go to Details" 
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};
HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginBotton: 20,
  },
});
export default HomeScreen;
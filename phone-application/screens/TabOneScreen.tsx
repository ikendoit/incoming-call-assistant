
import * as React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import CallDetectorManager from 'react-native-call-detection'
import firestore from '@react-native-firebase/firestore';

import { Text, View } from "../components/Themed";

var callDetector: any = undefined
const callsCollection = firestore().collection('calls');

export default function TabOneScreen() {


  const [callStates, setCallStates] = React.useState<String>('')
  const [listening, setListening] = React.useState<Boolean>(false)

  React.useEffect(() => {
    startListenerTapped()
  }, [])

  const setPhoneNumber = async (phoneNumber) => {
    // const response = await (await callsCollection.doc('uuid-123456').get()).data()
    // console.log(response)

    await callsCollection.doc('uuid-123456').set({phoneNumber})
  }

  const startListenerTapped = () => {
    stopListenerTapped()

    try {
      callDetector = new CallDetectorManager(
        (event: String, phoneNumber: String) => {
          if (event === 'Incoming') {
            console.log('sending to firebase', phoneNumber)
            // send to firebase that number
            setCallStates(phoneNumber)
            setPhoneNumber(phoneNumber)
          }
        },
        true,
        console.error,
        {
          title: 'Phone State and Call Log Permission',
          message: 'This app needs access to your phone state + Call Log in order to react and/or to adapt to incoming calls.'
        }
      )
      setListening(true)
    } catch (err) {
      console.log(err)
    }
  }

  const stopListenerTapped = () => {
    if (listening === true) {
      callDetector && callDetector.dispose();
      setListening(false)
    }
  }
  const currentDate = new Date();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentDate.toISOString()}</Text>
      <Text style={{ ...styles.title, height: listening ? 30 : 0 }}>{callStates}</Text>
      <Text style={{ ...styles.title, backgroundColor: listening ? 'green' : 'red' }}>{listening ? "Listening" : "Not Listening"}</Text>

      <TouchableHighlight onPress={stopListenerTapped}>
        <View style={styles.button}>
          <Text>Disable Listening</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={startListenerTapped}>
        <View style={styles.button}>
          <Text>Enable Listening</Text>
        </View>
      </TouchableHighlight>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 200,
    marginBottom: 20
  },
});


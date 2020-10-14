import React from 'react';
import { GoogleSpreadsheet } from "google-spreadsheet";
import logo from './logo.svg';
import './App.css';
import { firestore } from './Utils/Firebase'

var docSheet = undefined;
const callsCollection = firestore.collection('calls');

function App() {

  const [phoneNumber, setPhoneNumber] = React.useState('')

  React.useEffect( () => {
    initPhoneCallHandler()
    initSheetConnector()
  }, [] )

  const initSheetConnector = async (sheetId) => {
    docSheet = new GoogleSpreadsheet('1w9NYJ_0tllQLu14Z4X602uUekVII7D1LPX0WrSIGgB0');
    await docSheet.useServiceAccountAuth(require('./incoming-call-assistant.json'));
  }

  const readSpreadsheet = async (phoneNumber) => {
    try {

      // loads document properties and worksheets
      await docSheet.loadInfo();

      // get all rows except first ( header ) row.
      const sheetRows = await docSheet.sheetsById[0].getRows()
      const dataRows = sheetRows.map( e => e._rawData )
      console.log(dataRows, phoneNumber)
      const matching = dataRows.find ( e => e[0] === phoneNumber )
      if (!matching) return null;

      for (let link of matching[1].split('\n')) {

        window.open(link, "_blank")

      }

      return matching[1]

    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const unsetPhoneNumber = async () => {

    callsCollection.doc('uuid-123456').set({phoneNumber: 'null'})

  }


  // listen to phone call changes on Firebase
  const initPhoneCallHandler = async () => {

    callsCollection.doc('uuid-123456').onSnapshot(async (changes) => {
      const {phoneNumber} = await changes.data()
      setPhoneNumber(phoneNumber)
      await readSpreadsheet(phoneNumber)
      await unsetPhoneNumber()
    })

  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {phoneNumber}
        </p>
        <input placeholder='lookup-sheet-url' id="sheetId"/>
      </header>
    </div>
  );
}

export default App;

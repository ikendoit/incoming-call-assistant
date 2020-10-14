# Incoming call assistant Phone App

Detect incoming calls, notify the Web app of the phone Number.

## Dev

### Prerequisites
- run android emulator: open android studio project && select AVD && start emulator
- paste Firebase's google-services.json into android/app

### Run
npm install
( 1st terminal ) npm start
( end terminal ) npm run android

## Bug/Problem:
Awaiting approval/merge of the solution in https://github.com/priteshrnandgaonkar/react-native-call-detection/pull/77
Because the library "react-native-call-detection" is not collaborating with Android Version 9 or more. We need "READ_CALL_LOG" permission and the current version of that library is not handling it.

Work around: copy the index.js file in that Pull request, paste into node_modules/react-native-call-detection/index.js

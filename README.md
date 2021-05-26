<img src='https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/__DELELE_ME__/logo.png' width='40'>

# React Firebase Boilerplate

- [Live Preview](https://react-firebase-boilerpla-ce757.web.app/)

<img src='https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/__DELELE_ME__/ss1.jpg' width='48%'> <img src='https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/__DELELE_ME__/ss2.jpg' width='48%'> <img src='https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/__DELELE_ME__/ss3.jpg' width='48%'> <img src='https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/__DELELE_ME__/ss4.jpg' width='48%'>

## About

We spend a large amount of time to setup a project; changing file structure, installing libraries, create reusable components and so on. The purpose of using the project is to minimize the redundant effort to setup a project from scratch. In the boilerplate, it contains only commonly-used libraries and the all setup done for you.

## How to Use

#### 1. Register firebase app

- Go to [firebase console](https://console.firebase.google.com/u/0/) and create a project

  <img src='https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/__DELELE_ME__/step1.png' width='50%'>

- Select 「Web」

  <img src='https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/__DELELE_ME__/step2.png' width='50%'>

- Setup Authentication

  <img src='https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/__DELELE_ME__/step3.png' width='50%'>

- Setup Storage

  <img src='https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/__DELELE_ME__/step4.png' width='50%'>

- Setup Storage Rules

  <img src='https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/__DELELE_ME__/step5.png' width='50%'>

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }

    match /users/{userId} {
   		allow read, write : if request.auth.uid == userId;
		}
  }
}
```

- Copy keys

  <img src='https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/__DELELE_ME__/step6.png' width='50%'>

#### 2. Setup boilerplate

- Click "Use Template" to start or download the boilerplate from **Download Zip** button

- Go to [firebase.js](https://github.com/WataruMaeda/react-firebase-boilerplate/blob/master/src/utils/firebase.js#L6-L12) and replace keys.

- Install package using package manager tool

```
$ npm install
- or -
$ yarn install
```

- Global install firebase tools (Skip if you done the step)

```
$  npm install -g firebase-tools
```

- Login to your firebase account (Skip if you done the step)

```
$ firebase login
```

- Setup firebase in the boilerplate

```
$ firebase init
$
$ ...

? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices.
 ◯ Database: Deploy Firebase Realtime Database Rules
 ◯ Firestore: Deploy rules and create indexes for Firestore
 ◯ Functions: Configure and deploy Cloud Functions
 ◉ Hosting: Configure and deploy Firebase Hosting sites
❯◉ Storage: Deploy Cloud Storage security rules

=== Project Setup

? Please select an option: Use an existing project
i  Using project {your-project-id} ({your-project-name})

=== Hosting Setup

? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? No
? File build/404.html already exists. Overwrite? No
i  Skipping write of build/404.html
? File build/index.html already exists. Overwrite? No
i  Skipping write of build/index.html

=== Storage Setup

? What file should be used for Storage Rules? storage.rules

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!

```

- Update firease.json. Add headers and rewrites.

```firease.json
{
  "hosting": {
    "public": "build",
    "headers": [
      {"source": "/service-worker.js", "headers": [{"key": "Cache-Control", "value": "no-cache"}]}
    ],
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```

#### 3. Test

```
$ yarn build && firebase serve
- or -
$ npm build && firebase serve
```

#### 4. Deploy

```
$ yarn build && firebase deploy
- or -
$ npm build && firebase deploy
```

## Licence

This project is available under the MIT license. See the [LICENSE](https://github.com/WataruMaeda/react-native-boilerplate/blob/master/LICENSE) file for more info.

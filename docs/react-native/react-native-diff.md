# react-native工程创建指令差异

## React Native init:

### Advantages:

You can add native modules written in Java/Objective-C (probably the only but the strongest one)

### Disadvantages:

Needs Android Studio and XCode to run the projects
You can't develop for iOS without having a mac
Device has to be connected via USB to use it for testing
Fonts need to be imported manually in XCode
If you want to share the app you need to send the whole .apk / .ipa file
Does not provide JS APIs out of the box, e.g. Push-Notifications, Asset Manager, they need to be manually installed and linked with npm for example
Setting up a working project properly (inlcuding device configuration) is rather complicated and can take time

## Expo

### Advantages:

Setting up a project is easy and can be done in minutes
You (and other people) can open the project while you're working on it
Sharing the app is easy (via QR-code or link), you don't have to send the whole .apk or .ipa file
No build necessary to run the app
Integrates some basic libraries in a standard project (Push Notifications, Asset Manager,...)
You can eject it to ExpoKit and integrate native code continuing using some of the Expo features, but not all of them
Expo can build .apk and .ipa files (distribution to stores possible with Expo)

### Disadvantages:

You can't add native modules (probably a gamechanger for some)
You can't use libraries that use native code in Objective-C/Java
The standard Hello World app is about 25MB big (because of the integrated libraries)
If you want to use: FaceDetector, ARKit o Payments you need to eject it to ExpoKit
Ejecting it to ExpoKit has a trade-off of features of Expo, e.g. you cannot share via QR code
When ejecting to ExpoKit you are limited to the react native version that is supported by ExpoKit at that point in time
Debugging in ExpoKit (with native modules) is a lot more complicated, since it mixes two languages and different libraries (no official Expo support anymore)
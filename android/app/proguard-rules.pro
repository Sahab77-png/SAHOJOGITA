# ================REACT NATIVE CORE===========
# keep native React classes
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

#Hermes native code
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**

# Fabric Renderer
-keep class com.facebook.react.fabric.** { *: }
-dontwarn com.facebook.react.fabric.**

# React Native JSI ( JavaScript Interface)
-keep class com.facebook.jni.** { *; }
-dontwarn com.facebook.jni.**

#Required for HermerExecutor
-keep class com.facebook.hermes.reactexecutor.** { *; }

#==========APP PACKAGE===============
# Prevent obfuscation/removal of classes
-keep class com.sahojogita.social.** { *; }
-dontwarn com.sahojogita.social.**

#=============FIREBASE============
# Core Firebase
-keep class com.google.firebase.** {*;}
-dontwarn com.google.firebase.**

# Firebase Messaging
-keep class com.google.firebase.messaging.** { *; }
-dontwarn com.google.firebase.messaging.**
 
# Firebase Auth
-keep class com.google.firebase.auth.** { *; }
-dontwarn com.google.firebase.auth.**

# Firebase Firestore
-keep class com.google.firebase.firestore.** { *; }
-dontwarn com.google.firebase.firestore.**

# Firebase Analytics
-keep class com.google.firebase.analytics.** { *; }
-dontwarn com.google.firebase.analytics.**

# Firebase Storage
-keep class com.google.firebase.storage.** { *: }
-dontwarn com.google.firebase.storage.**

# Google Play Services Ads
-keep class com.google.android.gms.ads.** {*;}
-dontwarn com.google.android.gms.ads.**

# Google Play Services Base
-keep class com.google.android.gms.common.** { *; }
-dontwarn com.google.android.gms.common.**

#okhttp
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**

#Fresco
-keep class com.facebook.fresco.** { *; }
-dontwarn com.facebook.fresco.**

# Recaptcha
-keep class com.google.android.gms.recaptcha.** { *; }
-dontwarn com.google.android.gms.recaptcha.**

# For Firebase to parse JSON properly
-keepattributes Signature
-keepattributes *Annotation*

#=============ANDROIDX===========
#androidX
-keep class androidx.** { *; }
-dontwarn androidx.**
-keep class android.support.v4.** { *; }
-dontwarn android.support.v4.**

# Keep native methods
-keepclassmembers class * { native <methods>; } 

# Prevent stripping of native methods
-keepclasseswithmembers class * { native <methods>; }

# Retain resource identifiers
-keepclassmembers class **.R$* { public static <fields>; }

# Prevent crash on unknown class (better safe then sorry)
-dontnote
-ignorewarnings



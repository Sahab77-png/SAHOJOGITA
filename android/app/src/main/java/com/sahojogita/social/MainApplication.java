package com.sahojogita.social;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;
import android.os.UserManager;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.ReactInstanceManager;
import com.facebook.soloader.SoLoader;
import java.util.List;
import java.util.Collections;
import com.google.firebase.FirebaseApp;

public class MainApplication
extends Application implements
 ReactApplication {
    static {
        System.loadLibrary("MyAppModules");
    }
    private final ReactNativeHost
    mReactNativeHost = new DefaultReactNativeHost(this) {
    @Override
public boolean
getUseDeveloperSupport() {
    return BuildConfig.DEBUG;
}
@Override
protected String
getJSMainModuleName() {
    return "index";
    }
@Override
protected
java.util.List<com.facebook.react.ReactPackage> getPackages() {
    return new
    java.util.ArrayList<>();
}
    protected boolean
    isNewArchEnabled() {
        return
    BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
    protected Boolean
    isHermesEnabled() {
        return
    BuildConfig.IS_HERMES_ENABLED;
    }
};
@Override
    public ReactNativeHost
    getReactNativeHost() {
        return mReactNativeHost;
    }
   private static native void nativeInit();
@Override
public void onCreate() {
    super.onCreate();

 if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
    UserManager userManager = (UserManager)
    getSystemService(Context.USER_SERVICE);
    if (userManager != null && ! userManager.isUserUnlocked()) {
        SoLoader.init(this, false);
    
} else {
    SoLoader.init(this, false);
}
 } else {
    SoLoader.init(this, false);
 }
    if 
    (FirebaseApp.getApps(this).isEmpty())
    {
    FirebaseApp.initializeApp(this);
}
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    NotificationChannel channel =
    new NotificationChannel(
        "default_channel_id",
        "Default_Channel",
    NotificationManager.IMPORTANCE_DEFAULT
    );
    NotificationManager manager =
    getSystemService(NotificationManager.class);
    if (manager != null) {
        manager.createNotificationChannel(channel);
       }
     }
     if
     (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
        DefaultNewArchitectureEntryPoint.load();
     }
     ReactInstanceManager irm = getReactNativeHost().getReactInstanceManager();
     irm.createReactContextInBackground();
   }
 } 

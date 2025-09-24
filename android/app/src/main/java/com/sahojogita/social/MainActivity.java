package com.sahojogita.social;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.google.android.gms.ads.MobileAds;

public class MainActivity extends
ReactActivity {
    @Override
    protected String
    getMainComponentName() {
        return "sahojogita";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        com.google.android.gms.ads.MobileAds.initialize(this);
    }
}

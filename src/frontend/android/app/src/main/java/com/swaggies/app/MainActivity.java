package com.swaggies.app;

import android.os.Bundle;
import android.view.View;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Disable long-press copy
    getBridge().getWebView().setOnLongClickListener(v -> true);
    getBridge().getWebView().setLongClickable(false);
  }
}

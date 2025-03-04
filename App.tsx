import React, { useState, useRef } from 'react';
import { StatusBar, View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import type { WebViewNavigation } from 'react-native-webview'; // Added type import for navigation event

export default function App() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // Added type annotation
  const webViewRef = useRef<WebView | null>(null); // Added type annotation for ref

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Trigger a reload of the WebView
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
    setTimeout(() => setIsRefreshing(false), 1000); // Stop refreshing after 1 second
  };

  const handleNavigation = (event: WebViewNavigation) => { // Added type annotation for event
    console.log('Navigating to:', event.url);
    return true; // Allow navigation
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      >


        <WebView ref={webViewRef}
          source={{ uri: 'https://tracthing.com/' }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          sharedCookiesEnabled={true} // For iOS
          mixedContentMode="compatibility" // Allow mixed content
          onShouldStartLoadWithRequest={handleNavigation} // Intercept navigation
          injectedJavaScript={`console.log('WebView loaded');`}/>


      </ScrollView>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
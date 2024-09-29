"use client";
import "./globals.css";
import Layout from "@/_components/layout";
import { Provider } from "react-redux";
import { store } from "./store";
import { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <Layout>{children}</Layout>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

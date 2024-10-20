"use client";
import "./globals.css";
import Layout from "@/_components/layout";
import { Provider } from "react-redux";
import { store } from "./store";
import { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingProvider } from "@/context/loadingContext";
import { Toaster, toast } from 'sonner'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" richColors />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LoadingProvider>
              <Layout>{children}</Layout>
            </LoadingProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

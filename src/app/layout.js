"use client"
import "./globals.css";
import Layout from "@/_components/layout";
import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Layout>
            {children}
          </Layout>
        </Provider>
      </body>
    </html>
  );
}

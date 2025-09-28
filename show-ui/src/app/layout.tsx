import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/theme";
import StoreProvider from "./providers/storeProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Shop Management",
  description: "Application to manage shops, inventory, and branches effectively."
};
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = "en";

  return (
    <html lang={locale}>
      <body className={poppins.className} id="app">
        <div>
          <StoreProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}

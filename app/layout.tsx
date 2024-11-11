// RootLayout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { LocationProvider } from "~/utils/LocationContext";
import "./globals.css";
import { Wrapper } from "~/components";
import 'mapbox-gl/dist/mapbox-gl.css';
import { AccountProvider } from "~/utils/AccountContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WhatsTheWaterLike",
  description: "Know it all.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <AccountProvider>
            <Wrapper>
              <LocationProvider>
                {children}
              </LocationProvider>
            </Wrapper>
          </AccountProvider>
      </body>
    </html>
  );
}

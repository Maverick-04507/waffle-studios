import {Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";


export const metadata = {
  title: "Waffle Studio",
  description: "AI powered short video generation platform",
};

const outfit = Outfit({subsets:['latin']})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>    <html
      lang="en"
      className={outfit.className}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
        {children}
        </Provider>
        
        </body>
    </html>
    </ClerkProvider>

  );
}

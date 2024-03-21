import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import StoreProvider from "./redux/StoreProvider";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FreshFix",
  description: "Ordering restaurant app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <StoreProvider>
          <NavBar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

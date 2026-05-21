import Header from "@/components/Header";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import TanStackQueryProvider from "@/providers/TanStackQueryProvider";

const montserrat = Montserrat({
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Happy Tails",
  description: "Adopt a happy pet near you.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Toaster />
        <Header />
        <TanStackQueryProvider>
          <main>{children}</main>
        </TanStackQueryProvider>
        <Footer />
      </body>
    </html>
  );
}

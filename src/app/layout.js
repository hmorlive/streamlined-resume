import { Lato } from "next/font/google";
import "./globals.css";
import Navigation from "./navigation/navigation";
import Footer from "./footer/footer";

const font = Lato({
  style: "normal",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
  title: "Streamlined Resume",
  description: "Create a streamlined resume to land your dream job",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${font.className} min-h-screen bg-white flex flex-col flex-1 text-zinc-700`}
      >
        <Navigation />
        <main className="flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

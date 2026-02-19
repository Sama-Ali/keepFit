import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "KeepFit🏋",
  description: "Keep fit, feel better",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

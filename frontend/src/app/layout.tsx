import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen bg-purple-700">
        <Header />
        <main className="">{children}</main>
      </body>
    </html>
  );
}

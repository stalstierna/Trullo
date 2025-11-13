import "./globals.css";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import Background from "../components/Background";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Background />

        <Header />
        <main className="">{children}</main>
      </body>
    </html>
  );
}

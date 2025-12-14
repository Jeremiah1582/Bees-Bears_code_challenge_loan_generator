import "./globals.css";

export const metadata = {
  title: "Bees & Bears - Loan Management",
  description: "Solar panel installer loan management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

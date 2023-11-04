import './globals.css';
import NavbarComponent from "@/components/navbar.component";
import FooterComponent from "@/components/footer.component";

export const metadata = {
  title: 'Dribble',
  description: 'Dribble',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <NavbarComponent />
      <main>
        {children}
      </main>
      <FooterComponent />
      </body>
    </html>
  )
}

// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'Projet Dev',
  description: 'Page d\'accueil du projet Dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}

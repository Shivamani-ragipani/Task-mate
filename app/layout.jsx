export const metadata = {
  title: "Task Mate - Advanced To-Do List App",
  description: "Manage your tasks efficiently with Task Mate",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


import './globals.css'
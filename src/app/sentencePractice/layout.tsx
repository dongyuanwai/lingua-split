import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'lingua-split',
  description: 'Learning English through the method of constructing sentences with conjunctions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col">
          <div className='mb-20'>
            <Header />
          </div>
          <div className='mb-18 mt-20'>
            {children}
          </div>
          <div className='flex items-center justify-center py-10'>
            ddd
          </div>
        </div>
      </body>
    </html>
  )
}

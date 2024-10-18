import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthWrapper from '@/components/AuthWrapper';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bookit App | Book a room ',
  description: 'Book a meeting or conference room for your team',
};

export default function RootLayout({ children }) {
  return (
    <AuthWrapper>
      <html lang='en'>
        <body className={inter.className} suppressHydrationWarning={true}>
          <Header />
          <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthWrapper>
  );
}

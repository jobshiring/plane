import * as React from 'react';
import PropTypes from 'prop-types';
import ThemeRegistry from '@/theme';
import { Providers } from '@/lib/providers';
import { Poppins } from 'next/font/google';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import ProgressProvider from '@/providers/progress';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import staticData from 'src/static/data.json';
// SEO metadata
export async function generateMetadata() {
  return {
    metadataBase: new URL('https://vliegtickets.ai'),
    title: 'Vliegtickets en hotels vergelijken',
    description:
      'Vind de beste prijzen van vliegtickets en hotels van verschillende aanbieders.',
    tags: ['Vliegtickets', 'Hotels', 'Vergelijken'],
    icons: { icon: '/favicon.ico' },
  };
}

export const viewport = {
  themeColor: '#1A69BC',
};

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" className={poppins.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body>
        <GoogleTagManager gtmId={staticData.systemSettings.gtmId} />
        <GoogleAnalytics gaId={staticData.systemSettings.gaId} />
        <Providers>
          <ThemeRegistry lang="en" fontFamily={poppins.style.fontFamily}>
            <ProgressProvider>
              {/* client-side layout handler */}
              {/* <LayoutClient> */}
              {children}
              {/* </LayoutClient> */}
            </ProgressProvider>
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

import React from 'react';
// guard
import AdminGuard from 'src/guards/admin';
// layout
import DashboardLayout from 'src/components/layout/_admin';
// local static data
import staticData from 'src/static/data.json';

// --- SEO metadata (from local JSON only) ---
export async function generateMetadata() {
  const data = staticData;

  return {
    title: data.mainSettings?.seo?.metaTitle || 'Admin Dashboard',
    description:
      data.mainSettings?.seo?.metaDescription || 'Admin control panel',
    keywords: data.mainSettings?.seo?.tags || [],
    icons: { icon: data.mainSettings?.theme?.favicon || '/favicon.ico' },
  };
}

export const viewport = {
  themeColor: staticData.mainSettings?.theme?.palette?.primary || '#000000',
};

export default function RootLayout({ children }) {
  const mergedData = {
    ...staticData.mainSettings,
    ...staticData.languageAndCurrencies,
  };

  const contactData = staticData.contact;

  return (
    <AdminGuard>
      <DashboardLayout
        data={mergedData}
        contact={contactData}>
        {children}
      </DashboardLayout>
    </AdminGuard>
  );
}

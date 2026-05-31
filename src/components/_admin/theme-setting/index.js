'use client';
import React, { useEffect, useState } from 'react';
import ThemeSettingForm from '@/components/forms/theme-setting';
import dataJson from 'src/static/data.json'; // import local JSON

export default function ThemeSetting() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(dataJson);
    }, 400); // optional delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ThemeSettingForm currentSetting={data} />
    </>
  );
}

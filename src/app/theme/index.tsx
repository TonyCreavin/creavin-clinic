import React from 'react';
import { ConfigProvider } from 'antd';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#16423c' },
        components: {
          Button: {
            controlHeight: 40,
            borderRadius: 2,
            defaultBorderColor: '#16423c',
            controlOutline: 'none',
          },
          Input: {
            controlHeight: 40,
            borderRadius: 2,
          },
          Select: {
            controlHeight: 40,
            borderRadius: 2,
          },
        },
      }}
    >
      {' '}
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;

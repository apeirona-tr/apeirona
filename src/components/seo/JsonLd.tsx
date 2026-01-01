'use client';

import React from 'react';

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[];
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLdData = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLdData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export default JsonLd;


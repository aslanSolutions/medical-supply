import React from 'react';

export default function Glyph({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 ring-1 ring-blue-100">
      {children}
    </span>
  );
}

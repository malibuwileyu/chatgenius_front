'use client';
import React from 'react';

export default function ChannelPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <h1>Channel {params.id}</h1>
    </div>
  );
}

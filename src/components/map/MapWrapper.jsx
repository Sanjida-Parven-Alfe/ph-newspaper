"use client";

import dynamic from "next/dynamic";

const BangladeshMap = dynamic(() => import("./BangladeshMap"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-base-200 rounded-xl animate-pulse">
      <div className="flex flex-col items-center gap-2">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-sm text-base-content/60">Loading Map Interface...</p>
      </div>
    </div>
  )
});

export default function MapWrapper(props) {
  return <BangladeshMap {...props} />;
}
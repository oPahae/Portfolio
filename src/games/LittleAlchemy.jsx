import React, { useState } from "react";

const Zoom = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">

      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        className="w-full h-full"
        src="https://littlealchemy2.com"
        onLoad={() => setLoading(false)}
      ></iframe>

    </div>
  );
};

export default Zoom;
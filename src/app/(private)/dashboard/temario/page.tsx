"use client";

import { useEffect } from "react";

export default function TemarioPage() {
  useEffect(() => {
    // Redirige automáticamente al enlace del temario actualizado
    window.location.href =
      "https://drive.google.com/file/d/10qDQunyiYFQD9XwAS4VkSC9EyP1VnlVC/view?usp=sharing";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <p className="text-lg font-medium text-center">
        Redirigiendo al temario del Cinturón Negro…
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Si no se abre automáticamente,{" "}
        <a
          href="https://drive.google.com/file/d/10qDQunyiYFQD9XwAS4VkSC9EyP1VnlVC/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          haz clic aquí
        </a>
        .
      </p>
    </div>
  );
}

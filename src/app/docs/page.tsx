const btn =
  "rounded-full border border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8";

export default function DocsPage() {
  return (
    <div className="px-6 sm:px-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-bold mb-4">Documentación</h1>
          <p className="text-base leading-relaxed">
            En esta sección puedes consultar documentos oficiales, temarios y
            normativas actualizadas. Pulsa en los siguientes botones para acceder
            directamente a cada uno.
          </p>
        </header>

        {/* Botones en la misma fila */}
        <div className="flex flex-wrap gap-4">
          <a
            className={btn}
            href="https://drive.google.com/file/d/1GrjpaMsqJzJrXrSXUTknzfdr5ThkCBOb/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            CUOTAS
          </a>

          <a
            className={btn}
            href="https://drive.google.com/file/d/1WzMoVg07-mX-t4U9GwfIOOCTvO8TGQhT/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            TEMARIO CINTURÓN NEGRO
          </a>

          <a
            className={btn}
            href="https://drive.google.com/file/d/1nKC-uvuu2vq2N9TafPdGclRiNq7eY9fa/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            HOJA ACTIVIDADES NACIONALES
          </a>

          <a
            className={btn}
            href="https://www.fetaekwondo.net/normativas-y-estatutos"
            target="_blank"
            rel="noopener noreferrer"
          >
            NORMATIVAS F.E.TAEKWONDO
          </a>
        </div>
      </div>
    </div>
  );
}

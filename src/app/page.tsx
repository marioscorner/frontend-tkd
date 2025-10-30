import Image from "next/image";
import taekwondo from "../../public/tkd_main.jpg";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex items-center justify-center">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-6xl">
        {/* Columna izquierda: texto y botones */}
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">¿Qué es el Taekwondo?</h1>
            <p className="text-base leading-relaxed mb-4">
              El <strong>Taekwondo</strong> es un arte marcial de origen coreano
              que combina técnicas de defensa personal con un profundo enfoque
              en el desarrollo físico y mental. Es un deporte olímpico que
              destaca por sus potentes y variadas patadas, así como por los
              valores que promueve: respeto, disciplina, autocontrol y
              perseverancia.
            </p>
            <p className="text-base leading-relaxed">
              Además de ser una práctica deportiva, el Taekwondo busca formar el
              carácter de quien lo entrena, fomentando la armonía entre cuerpo y
              mente. En competición, se divide en dos modalidades principales:{" "}
              <em>combate</em> y <em>poomsae</em> (formas técnicas).
            </p>
          </div>

          {/* Botones en una fila */}
          <div className="flex flex-wrap gap-4">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
              href="https://fmtaekwondo.es/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Federación Madrileña
            </a>

            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
              href="https://rfetaekwondo.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Federación Española
            </a>

            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
              href="https://worldtaekwondo.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              World Taekwondo
            </a>

            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
              href="https://olympics.com/es/deportes/taekwondo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Taekwondo Olímpico
            </a>
          </div>
        </div>

        {/* Columna derecha: imagen (añádela tú en /public o vía URL) */}
        <div className="flex justify-center">
          {/* Sustituye el src con tu imagen */}
          <Image
            src={taekwondo}
            alt="Practicante de Taekwondo"
            width={500}
            height={400}
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}

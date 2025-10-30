import Image from "next/image";
import profile from "../../../public/mario.jpeg";
export default function About() {
  return (
    <>
      <div className="flex justify-center font-sans min-h-screen p-8 pb-20 gap-5 sm:p-10">
        <div>
          <h1 className="text-3xl text-center font-bold">Sobre mí</h1>
          <p className="mt-4 text-center">
            ¡Hola! Soy Mario Gutiérrez. <br />
            Llevo practicando Taekwondo desde que tengo memoria, y hace casi 10
            años que me embarqué en la aventura de devolverle al Taekwondo todo
            lo que me ha dado. <br />
            Me apasiona compartir mis conocimientos y experiencias con mis
            alumnos, ayudándoles a crecer tanto en habilidades marciales como en
            confianza personal. <br />
            Mi objetivo es crear un ambiente de aprendizaje positivo y
            motivador, donde cada estudiante pueda alcanzar su máximo potencial.{" "}
            <br />
            Pero no todo es Taekwondo en mi vida. También disfruto de la música,
            la lectura y otros tantos hobbies. Creo que el Taekwondo es algo que
            nos acompaña durante nuestra vida y nos ayuda a enfrentar los
            desafíos que se nos plantean, pero también soy consciente de que no
            solo nos define esto, sino también más cosas. Y por eso he querido
            compartir las que me definen a mí <br />
            ¡Espero que nos veamos pronto!
          </p>
        </div>
        <Image
          src={profile}
          alt="Foto de mario"
          width={650}
          height={300}
          className="rounded-2xl object-cover shadow-lg"
        />
      </div>
    </>
  );
}

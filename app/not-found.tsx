import Link from "next/link";
export default function notFound() {
  return (
    <main className="flex-1 flex justify-center items-center flex-col gap-6">
      <h1 className="font-black text-8xl text-(--main-red)">404</h1>
      <p className="text-center w-75 sm:w-100">Il semble que la page que vous cherchez ait pris des vacances… ou n’ait jamais existé.</p>
      <div className="flex flex-col gap-2">
        <Link href="/" className="justify-center items-center flex bg-(--main-red) text-white rounded-lg w-50 h-9">Accueil</Link>
        <Link href="/logements" className="justify-center items-center flex bg-(--main-red) text-white rounded-lg w-50 h-9">Logements</Link>
      </div>
    </main>
  );
}

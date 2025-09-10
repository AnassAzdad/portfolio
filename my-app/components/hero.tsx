export default function Hero() {
  return (
    <section className="text-center py-20 px-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-white mb-4">
        Hoi, ik ben Anass
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6">
        Frontend developer in opleiding – bekijk mijn werk!
      </p>
      <a
        href="#projects"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Bekijk projecten
      </a>
    </section>
  );
}

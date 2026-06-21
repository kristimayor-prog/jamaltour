export default function JeepSafariPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[60vh]">
        <img
          src="/images/alanya-hero.jpg"
          alt="Jeep Safari"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-10 left-10">
          <h1 className="text-6xl font-bold mb-4">
            Jeep Safari в Алании
          </h1>

          <p className="text-2xl text-gray-200">
            Незабываемое путешествие по горам и природе Алании
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Описание экскурсии
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Захватывающее сафари на джипах по красивейшим
              местам Алании: горные дороги, панорамные виды,
              деревни, водопады и остановки для фото.
            </p>

            <ul className="space-y-4 text-lg text-gray-300">
              <li>✓ Трансфер из отеля</li>
              <li>✓ Русскоязычный гид</li>
              <li>✓ Обед включен</li>
              <li>✓ Страховка</li>
            </ul>
          </div>

          <div className="bg-neutral-900 rounded-3xl p-10 border border-white/10 h-fit">
            <div className="text-gray-400 mb-2">
              Стоимость
            </div>

            <div className="text-5xl font-bold text-yellow-400 mb-8">
              35$
            </div>

            <a
              href="https://wa.me/905551112233?text=Здравствуйте!%20Хочу%20забронировать%20Jeep%20Safari%20в%20Аланье."
              target="_blank"
              className="block w-full bg-yellow-500 hover:bg-yellow-400 text-black text-center py-4 rounded-2xl text-xl font-semibold transition"
            >
              Забронировать
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
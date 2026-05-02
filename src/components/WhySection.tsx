export default function WhySection() {
  const points = [
    "Durable & chip-resistant",
    "Microwave & dishwasher safe",
    "Designed for plating aesthetics",
    "Consistent bulk supply",
  ];

  return (
    <section className="px-10 py-20">
      <h2 className="text-3xl mb-10">Built for Hospitality</h2>

      <div className="grid grid-cols-2 gap-6">
        {points.map((point, index) => (
          <div key={index} className="p-6 bg-white rounded-xl shadow">
            {point}
          </div>
        ))}
      </div>
    </section>
  );
}
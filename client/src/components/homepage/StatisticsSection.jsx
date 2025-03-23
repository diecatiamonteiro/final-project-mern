import React from "react";
import { motion } from "framer-motion";

// StatCard component
function StatCard({ value, label, suffix, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <motion.p className="text-3xl lg:text-5xl font-bold text-offwhite md:mb-2">
        <SimpleCounter value={value} />
        {suffix}
      </motion.p>
      <p className="text-xl text-offwhite/80">{label}</p>
    </motion.div>
  );
}

// Counter
function SimpleCounter({ value }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentCount = Math.floor(progress * value);

      if (progress < 1) {
        setCount(currentCount);
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value]);

  return count;
}

export default function StatisticsSection() {
  const stats = [
    { value: 500, label: "Artists", suffix: "+" },
    { value: 300, label: "Venues", suffix: "+" },
    { value: 1200, label: "Successful Bookings", suffix: "+" },
    { value: 25, label: "German Cities", suffix: "+" },
  ];

  return (
    <section className="py-6 md:py-12 lg:py-24 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 full-width-section">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12"
        >
          The Greenroom in Numbers
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
}

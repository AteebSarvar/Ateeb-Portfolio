import React, { useEffect, useRef } from "react";
import { education } from "../../constants";

const Education = () => {
  const sectionRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const progressLine = progressLineRef.current;

    const handleScroll = () => {
      const sectionRect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      if (sectionRect.top <= windowHeight && sectionRect.bottom >= 0) {
        const scrollPercent =
          (windowHeight - sectionRect.top) / (windowHeight + sectionHeight);
        const clampedScrollPercent = Math.min(Math.max(scrollPercent, 0), 1);
        progressLine.style.height = `${clampedScrollPercent * 100}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="education"
      className="py-24 bg-skills-gradient clip-path-custom-2 font-sans"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">EDUCATION</h2>
          <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
          <p className="text-gray-400 mt-4 text-lg font-semibold">
            My education has been a journey of learning and development. Here
            are the details of my academic background
          </p>
        </div>

        <div className="relative" ref={sectionRef}>
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-white h-full z-0" />
          <div
            ref={progressLineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#8245ec] h-0 z-10 transition-all duration-500 ease-in-out"
          />

          {education.map((edu, index) => (
            <div
              key={edu.id}
              className={`w-full flex flex-col md:flex-row items-center mb-20 relative ${
                index % 2 === 0 ? "md:justify-end" : "md:justify-start"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bg-white border-4 border-[#8245ec] w-16 h-16 rounded-full z-20 flex justify-center items-center">
                <img
                  src={edu.img}
                  alt={edu.school}
                  className="w-3/4 h-3/4 object-contain rounded-full"
                />
              </div>

              {/* Card */}
              <div
                className={`relative w-full md:w-[520px] mt-12 md:mt-0 p-6 md:p-8 rounded-2xl shadow-2xl border border-white bg-gray-900 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] ${
                  index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                } transform transition-transform duration-300 hover:scale-105 z-10`}
              >
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-white rounded-md overflow-hidden">
                    <img
                      src={edu.img}
                      alt={edu.school}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {edu.degree}
                    </h3>
                    <h4 className="text-md text-gray-300">{edu.school}</h4>
                    <p className="text-sm text-gray-500 mt-1">{edu.date}</p>
                  </div>
                </div>

                <p className="mt-4 text-gray-400 font-bold">
                  Grade: {edu.grade}
                </p>
                <p className="mt-2 text-gray-400">{edu.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

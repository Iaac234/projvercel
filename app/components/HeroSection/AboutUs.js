import React from 'react';

const AboutUs = () => {
  return (
    <div className="font-sans antialiased text-gray-900 w-full">
      <div className="w-full text-center">

        <div className="py-10 bg-gray-100 w-full">
          <h3 className="text-3xl font-bold text-pri mb-8">About Us</h3>
          <p className="text-lg text-pri w-[90%] mb-12 max-w-2xl mx-auto max-md:text-sm">
            After years of varying success, I have realized that 90% of debate seminars are practically useless ("-") and the only way to improve (especially if you feel like you're stuck) is to go through debate transcripts and see what others are doing correctly.
          </p>
        </div>

        <div className="py-5 max-w-[1000px] mx-auto">

          <h2 className="text-3xl font-bold text-pri mb-8">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-10">

            <div className="bg-white w-[90%] max-w-[290px] max-md:max-w-[230px] cursor-pointer p-8 rounded-lg transition" style={{ boxShadow: "rgb(208, 208, 208) 0px 0px 10px 0px" }}>
              <img src="https://via.placeholder.com/150" alt="John Doe" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-pri mb-2">John Doe</h3>
              <p className="text-pri max-md:text-[13px]">Founder & CEO</p>
              <p className="mt-2 max-md:text-[13px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, expedita necessitatibus. Minima, minus nulla </p>
            </div>

            <div className="bg-white w-[90%] max-w-[290px] max-md:max-w-[230px] cursor-pointer p-8 rounded-lg transition" style={{ boxShadow: "rgb(208, 208, 208) 0px 0px 10px 0px" }}>
              <img src="https://via.placeholder.com/150" alt="Jane Smith" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-pri mb-2">Jane Smith</h3>
              <p className="text-pri max-md:text-[13px]">CTO & Lead Developer</p>
              <p className="mt-2 max-md:text-[13px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, expedita necessitatibus. Minima, minus nulla </p>
            </div>

            <div className="bg-white w-[90%] max-w-[290px] max-md:max-w-[230px] cursor-pointer p-8 rounded-lg transition" style={{ boxShadow: "rgb(208, 208, 208) 0px 0px 10px 0px" }}>
              <img src="https://via.placeholder.com/150" alt="Emily Johnson" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-pri mb-2">Emily Johnson</h3>
              <p className="text-pri max-md:text-[13px]">Customer Success Manager</p>
              <p className="mt-2 max-md:text-[13px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, expedita necessitatibus. Minima, minus nulla </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

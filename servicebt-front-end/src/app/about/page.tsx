// app/about/page.tsx
"use client";

// import Image from "next/image";
import FAQAccordion from "@/components/AboutUsBox/FAQAccordion";
import FeedbackForm from "@/components/AboutUsBox/FeedbackForm";
import TabSection from "@/components/AboutUsBox/TabSection";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Shared/Footer";

export default function AboutPage() {
  return (
    <div className="p-8 space-y-12 ">
      <Navbar />

      {/* Hero Section with Background Image */}
      <section
        className="relative flex flex-col items-center justify-center text-center h-64 mb-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-4xl font-bold text-white z-10">
          What is service Bt?
        </h1>
      </section>

      {/* About Us Section */}
      <section className="flex flex-wrap mb-12">
        <div className="w-full md:w-1/2 p-4">
          <Image
            src="/logo_design.jpg"
            alt="About Us"
            width={400}
            height={300}
            className="rounded"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-4">Service BT</h2>
          <p className="text-gray-600 mb-4">
            Service.bt is a platform connecting clients in Bhutan with trusted
            local service providers. Our goal is to make finding skilled
            professionals easier for everyone, from home repairs to technical
            services, tutoring, and more. Service providers can grow their
            businesses by reaching more clients, while clients can access
            quality services with ease and security. With transparent ratings,
            job posts, and secure payments, we create a reliable and efficient
            ecosystem for both clients and professionals. Join Service.bt today
            and discover a smarter way to get things done!
          </p>
          <TabSection />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <FAQAccordion />
      </section>

      {/* Feedback Section */}
      <section>
        <h2 className="aline first:text-2xl font-semibold mb-4">Feedback</h2>
        <FeedbackForm />
      </section>
      <div className=" space-y-12">
        <Footer />
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Footer from '@/app/components/Footer'

// Dummy Job Data
const jobData = [
  {
    id: 1,
    title: "Web Developer Needed",
    description:
      "Build and maintain a fully responsive e-commerce platform for our brand.",
    budget: "BTN 20k",
    avgBid: "Avg Bid",
  },
  {
    id: 2,
    title: "Graphic Designer for Logo",
    description:
      "Design a professional logo for our startup. Experience with vector graphics is preferred.",
    budget: "BTN 15k",
    avgBid: "Avg Bid",
  },
  {
    id: 3,
    title: "SEO Expert for Website",
    description:
      "Improve website SEO rankings and optimize on-page content for search engines.",
    budget: "BTN 25k",
    avgBid: "Avg Bid",
  },
  {
    id: 4,
    title: "Content Writer Needed",
    description:
      "Write high-quality blog posts for our tech company. Topics include AI, ML, and cloud computing.",
    budget: "BTN 12k",
    avgBid: "Avg Bid",
  },
  {
    id: 5,
    title: "UI/UX Designer",
    description:
      "Redesign our mobile app with a focus on usability and a clean design approach.",
    budget: "BTN 30k",
    avgBid: "Expert",
  },
];

const FindJobsPage = () => {
  const [jobs, setJobs] = useState(jobData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ budgetMin: "", budgetMax: "" });

  // Handle Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterJobs(value, filters.budgetMin, filters.budgetMax);
  };

  // Handle Budget Filtering
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    filterJobs(searchTerm, updatedFilters.budgetMin, updatedFilters.budgetMax);
  };

  // Filter Jobs Function
  const filterJobs = (
    search: string,
    budgetMin: string,
    budgetMax: string
  ) => {
    let filteredJobs = jobData;

    if (search) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (budgetMin || budgetMax) {
      filteredJobs = filteredJobs.filter((job) => {
        const budgetValue = parseInt(job.budget.replace("BTN ", ""));
        const min = budgetMin ? parseInt(budgetMin) : 0;
        const max = budgetMax ? parseInt(budgetMax) : Infinity;
        return budgetValue >= min && budgetValue <= max;
      });
    }

    setJobs(filteredJobs);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header */}
      <header className="bg-white shadow-sm py-6 px-6 mb-4">
        <h1 className="text-3xl font-bold text-orange-500 mb-2">Find jobs!</h1>
        <p className="text-sm text-gray-600">
          Hire Great Freelancers, Fast. Find the perfect fit for your projects.
        </p>
      </header>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6 mx-6">
        {/* Filter Sidebar */}
        <aside className="w-full md:w-1/3 bg-white shadow-sm rounded-lg p-5 space-y-6">
          <div>
            <label className="block font-medium mb-2">Search keyword</label>
            <input
              type="text"
              placeholder="Search for jobs..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full border rounded px-4 py-2 focus:outline-orange-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Budget</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="budgetMin"
                placeholder="Min"
                value={filters.budgetMin}
                onChange={handleBudgetChange}
                className="w-1/2 border rounded px-3 py-2 focus:outline-orange-500"
              />
              <input
                type="number"
                name="budgetMax"
                placeholder="Max"
                value={filters.budgetMax}
                onChange={handleBudgetChange}
                className="w-1/2 border rounded px-3 py-2 focus:outline-orange-500"
              />
            </div>
          </div>
        </aside>

        {/* Job Listings */}
        <section className="w-full md:w-2/3 space-y-6">
          <p className="text-gray-600">
            {jobs.length} jobs found
          </p>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-sm rounded-lg p-5 flex justify-between items-start"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {job.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-orange-500 font-semibold text-lg">
                    {job.budget}
                  </p>
                  <p className="text-gray-500 text-sm">{job.avgBid}</p>
                  <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                    Bid now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No jobs match your criteria.</p>
          )}
        </section>
      </div>

      {/* Footer */}
     
      <Footer/>
    </div>
  );
};

export default FindJobsPage;

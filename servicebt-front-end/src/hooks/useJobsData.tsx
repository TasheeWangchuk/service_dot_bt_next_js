import { useState, useEffect } from "react";
import apiClient from "@/app/lib/apiClient";

interface Skill {
  skill_id: number;
  name: string;
}

interface Job {
  job_id: number;
  title: string;
  payment_type: string;
  budget: number;
  experience_level: string;
  job_category_name: string;
  status: string;
  created_at: string;
  skills: Skill[];
}

export const useJobStats = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiClient.get("/api/v1/jobs/");
        setJobs(response.data);
      } catch (err) {
        setError("Failed to fetch job data");
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getBudgetRanges = () => {
    const ranges = [
      { range: "0-1000", min: 0, max: 1000 },
      { range: "1001-3000", min: 1001, max: 3000 },
      { range: "3001-5000", min: 3001, max: 5000 },
      { range: "5001+", min: 5001, max: Infinity },
    ];

    return ranges.map((range) => ({
      name: range.range,
      count: jobs.filter(
        (job) => job.budget >= range.min && job.budget <= range.max
      ).length,
      totalBudget: jobs
        .filter((job) => job.budget >= range.min && job.budget <= range.max)
        .reduce((sum, job) => sum + job.budget, 0),
    }));
  };

  return { jobs, loading, error, getBudgetRanges };
};

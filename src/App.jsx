import React, { useEffect, useState } from "react";
import { JobPosting } from "./components/job-posting";

const JOBS_PER_PAGE = 6;
const API_DOMAIN = "https://hacker-news.firebaseio.com";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [jobIds, setJobIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const fetchJobIds = async (currPage = 0) => {
    try {
      let jobs = jobIds;

      if (jobs.length < 1) {
        const response = await fetch(`${API_DOMAIN}/v0/jobstories.json`);
        jobs = await response.json();
        setJobIds((prev) => [...prev, ...jobs]);
      }

      let start = currPage * JOBS_PER_PAGE;
      let end = start + JOBS_PER_PAGE;

      return jobs.slice(start, end);
    } catch (error) {}
  };

  const fetchJobs = async (currPage) => {
    const jobIdsPerPage = await fetchJobIds(currPage);

    try {
      setIsFetching(true);
      const newJobs = await Promise.all(
        jobIdsPerPage.map((jobId) =>
          fetch(`${API_DOMAIN}/v0/item/${jobId}.json`).then((res) => res.json())
        )
      );
      setJobs((prevJob) => [...prevJob, ...newJobs]);
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="bg-slate-300">
      <div className="max-w-4xl w-full  mx-auto min-h-screen px-4 py-6 ">
        <h1 className="text-4xl text-center font-bold text-orange-500">
          Hacker News Jobs Board
        </h1>
        <div className="mt-8 flex flex-col gap-4">
          {jobs.length === 0 ? (
            <p className="text-2xl font-semibold text-gray-700 text-center">
              Loading...
            </p>
          ) : (
            jobs.map((job) => <JobPosting key={job.id} job={job} />)
          )}
        </div>
        {jobs.length > 0 &&
          currentPage * JOBS_PER_PAGE + JOBS_PER_PAGE < jobIds.length && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="bg-orange-500 text-white  px-4 py-2 rounded-md hover:bg-orange-500/80 font-semibold"
              >
                {isFetching ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

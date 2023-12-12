export function JobPosting({ job }) {
  if (!job) return null;
  return (
    <div className="bg-white p-4 rounded-md shadow-sm shadow-gray-400">
      {job.url ? (
        <a
          href={job.url}
          target="_blank"
          rel="noopener"
          className="text-2xl hover:underline text-slate-900 
            font-semibold "
        >
          {job.title}
        </a>
      ) : (
        <p className="text-2xl text-slate-900 font-semibold">{job.title}</p>
      )}
      <p className="text-slate-600 text-base mt-2 font-medium">
        By {job.by} &bull; {new Date(job.time * 1000).toLocaleDateString()},{" "}
        {new Date(job.time).toLocaleTimeString()}
      </p>
    </div>
  );
}

export function filterJobs(jobs = [], search = "") {
  if (!search.trim()) return jobs;

  const pattern = search
    .toLowerCase()
    .split("")
    .map((char) => `.*${char}`)
    .join("") + ".*";

  const regex = new RegExp(pattern, "i"); 

  return jobs.filter((job) =>
    regex.test(job.title) ||
    regex.test(job.location) ||
    regex.test(job.company) ||
    regex.test(job.type) 
  );
}


export function getInitials(name = "") {
  const words = name.trim().split(" ");
  if (words.length === 0) return "";
  if (words.length === 1) return words[0][0]?.toUpperCase() || "";
  return (words[0][0] + words[1][0]).toUpperCase();
}
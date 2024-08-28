import { IJobDetail } from "@/model/job";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInfiniteQuery } from "react-query";
import baseRepository from "@/repository/base";


export default function Dashboard() {
  const [filter, setFilter] = useState("");
  const [location, setLocation] = useState("");
  const [fullTimeOnly, setFullTimeOnly] = useState(false);
  const [jobs, setJobs] = useState<IJobDetail[]>([]);
  const [page, setPage] = useState(1);
  const [isMore, setIsMore] = useState(true);
  
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
  } = useInfiniteQuery(
    ["jobs", filter, location, fullTimeOnly],
    ({ pageParam = 1 }) =>
      baseRepository.getAllJob({
        description: filter,
        location: location,
        full_time: fullTimeOnly ? "true" : "false",
        page: pageParam.toString(),
      }),
    {
      getNextPageParam: (lastPage) => {
        // Assume that the API returns an empty array when there are no more jobs
        if (lastPage.data.length === 0) return undefined;
        return page + 1; // Adjust this based on your API's pagination logic
      },
      onError: (error) => {
        setIsMore(false);
        console.log(error);
      },
    }
  );

  
  useEffect(() => {
    if (data) {
      const jobs = data?.pages.flatMap((page) => page.data) || [];
      setJobs(jobs);
    }
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 bg-gray-50 min-h-screen"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        GitHub Jobs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Input
          placeholder="Filter by title, benefits, companies, expertise"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white"
        />
        <Input
          placeholder="Filter by city, state, zip code or country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-white"
        />
        <div className="flex items-center space-x-2 bg-white p-2 rounded-md">
          <Checkbox
            id="fullTime"
            checked={fullTimeOnly}
            onCheckedChange={(checked) => setFullTimeOnly(checked as boolean)}
          />
          <label
            htmlFor="fullTime"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Full Time Only
          </label>
          <Button className="ml-auto">Search</Button>
        </div>
      </div>
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Job List</h2>
        <div className="space-y-6">
          {!isLoading ? (
            jobs?.filter((job): job is IJobDetail => job != null).length > 0 ? (
              jobs
                .filter((job): job is IJobDetail => job != null)
                .map((job, index) => (
                  <motion.div
                    key={index}
                    className="border-b pb-4 last:border-b-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/jobs/${job?.id}`}
                      className="text-xl font-medium text-blue-600 hover:underline"
                    >
                      {job?.title}
                    </Link>
                    <p className="text-md text-gray-600 mt-1">
                      {job?.company} -{" "}
                      <span className="text-green-600 font-semibold">{job?.type}</span>
                    </p>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>{job?.location}</span>
                      <span>{job?.created_at}</span>
                    </div>
                  </motion.div>
                ))
            ) : (
              <p className="text-center text-gray-500 mt-4">
                No jobs found matching your criteria.
              </p>
            )
          ) : (
            <motion.div
              className="text-center text-gray-500 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>Loading...</p>
            </motion.div>
          )}
        </div>
        {jobs?.length > 0 && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button onClick={() => {
              if (!isError) {
                setPage(page + 1);
                fetchNextPage();
              } else {
                setIsMore(false);
              }
            }} size="lg">
              {isMore ? "Load More" : "No More Jobs"}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
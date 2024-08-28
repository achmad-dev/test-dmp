import { IJobDetail } from "@/model/job";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import baseRepository from "@/repository/base";
import { useQuery } from "react-query";
import { ArrowLeft, Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState<IJobDetail | null>(null);
  const { isLoading, isError } = useQuery(
    ["job", id],
    () => baseRepository.getJobById(id as string),
    {
      onSuccess: (data) => {
        if (data?.data) {
          setJob(data.data);
        } else {
          setJob(null);
        }
      },
      onError: (error) => {
        console.log(error);
        setJob(null);
      },
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 bg-gray-50 min-h-screen"
    >
      {isLoading ? (
        <motion.div
          className="text-center text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>Loading...</p>
        </motion.div>
      ) : isError || !job ? (
        <motion.div 
          className="text-center text-red-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          >
          <p>Error loading job details.</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <Link to="/" className="text-blue-600 hover:underline mb-6 inline-flex items-center">
            <ArrowLeft className="mr-2" size={20} />
            Back to Job List
          </Link>
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{job?.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 gap-4">
              <span className="flex items-center">
                <Briefcase size={18} className="mr-2" />
                {job?.type}
              </span>
              <span className="flex items-center">
                <MapPin size={18} className="mr-2" />
                {job?.location}
              </span>
              <span className="flex items-center">
                <Calendar size={18} className="mr-2" />
                Posted {job?.created_at}
              </span>
            </div>
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-6">
            <motion.div
              className="md:col-span-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job?.description || "" }} />
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{job?.company}</h2>
                <img src={job?.company_logo || ""} alt={`${job?.company} logo`} className="w-full mb-2 rounded" />
                <a
                  href={job?.company_url || "#"}
                  className="text-blue-600 hover:underline flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Company Website
                  <ExternalLink size={18} className="ml-2" />
                </a>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">How to apply</h3>
                <div dangerouslySetInnerHTML={{ __html: job?.how_to_apply || "" }} />
              </div>
            </motion.div>
          </div>
          <motion.div
            className="p-6 bg-gray-100 border-t"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button size="lg" className="w-full md:w-auto">
              Apply Now
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
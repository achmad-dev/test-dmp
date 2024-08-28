import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LockIcon, MailIcon } from "lucide-react";
import baseRepository from "@/repository/base";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { mutate } = useMutation(baseRepository.login, {
    onSuccess: ({ data }) => { 
      Cookies.set("access_token", data.access_token);
      navigate("/");
     },
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     onError: (error: any) => {
       toast.error(error.response.data.message);
     }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ username: name, password: password });
    console.log("Sign in with:", name, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-8">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold text-center text-blue-800 mb-6"
            >
              Sign In
            </motion.h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-blue-700"
                >
                  Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="username"
                    placeholder="Enter your username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <MailIcon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                    size={18}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-blue-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <LockIcon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                    size={18}
                  />
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                >
                  Sign In
                </Button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

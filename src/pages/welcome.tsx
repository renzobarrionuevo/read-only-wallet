import { useEffect } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner";


const Welcome = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulate a loading of the welcome page for 4 seconds.
    const timer = setTimeout(() => {
      // Redirect to the main page after 4 seconds.
      router.push("/");
    }, 4000);

    // Clear the timer
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-black h-screen w-screen absolute">
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-white font-bold text-2xl ">
        <h1>Welcome to Address reader</h1>
      </div>
      <Spinner/>
    </div>
  );
};

export default Welcome;

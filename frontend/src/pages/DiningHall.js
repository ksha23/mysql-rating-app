import { useState, useEffect } from "react";
import DiningDetails from "../components/DiningDetails";

const DiningHall = () => {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchDiningHalls = async () => {
      try {
        const response = await fetch("/api/diningHalls");
        if (response.ok) {
          const json = await response.json();
          setHalls(json);
        } else {
          setHalls([]); // Handle errors or set default value for halls state
        }
      } catch (error) {
        console.error("Error fetching dining halls:", error); // Handle fetch errors
      }
    };
    fetchDiningHalls();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold text-center pt-20 pb-5">
        Mad Eats: Dining Halls
      </h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 pl-8 pr-8">
          {halls &&
            halls.map((hall) => (
              <div key={hall.id} className="w-full">
                <div className="p-4">
                  <DiningDetails diningHall={hall} className="h-full" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default DiningHall;

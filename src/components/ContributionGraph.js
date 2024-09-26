import { UserContext } from "@/contexts/Contexts";
import useFetch from "@/customHooks/useFetch";
import { useContext, useEffect, useState } from "react";

const daysInMonth = (month) => {
  if (["Nov", "Jun", "Apr", "Sep"].includes(month)) return 30;
  else if (month === "Feb") return 28;
  else return 31;
};

export default function ContributionGraph() {
  const { userData } = useContext(UserContext);
  const { user } = userData;
  const { token } = user;
  const fetch = useFetch(token);

  const [contributions, setContributions] = useState([]);
  // Make get request to all user's contributions
  const getContributions = () => {
    fetch
      .getData(`/contributions/${user.user._id}`, token)
      .then((res) => setContributions(res.data));
  };

  useEffect(() => {
    getContributions();
  }, []);

  const months = [
    { month: "Jan", days: daysInMonth("Jan") },
    { month: "Feb", days: daysInMonth("Feb") },
    { month: "Mar", days: daysInMonth("Mar") },
    { month: "Apr", days: daysInMonth("Apr") },
    { month: "May", days: daysInMonth("May") },
    { month: "Jun", days: daysInMonth("Jun") },
    { month: "Jul", days: daysInMonth("Jul") },
    { month: "Aug", days: daysInMonth("Aug") },
    { month: "Sep", days: daysInMonth("Sep") },
    { month: "Oct", days: daysInMonth("Oct") },
    { month: "Nov", days: daysInMonth("Nov") },
    { month: "Dec", days: daysInMonth("Dec") },
  ];

  // Flatten the months into one array of 365 days, each day containing its respective month and day
  const daysInYear = months.flatMap((month) =>
    // Maps over each day in month, adding to it an object containing month and day
    [...Array(month.days)].map((_, i) => ({
      month: month.month,
      day: i + 1,
      color: "",
    }))
  );

  contributions.map((date) => {
    daysInYear.find((element) => {
      const day = date.date_formatted.slice(3, 6);
      if (date.date_formatted.includes(element.month) && day == element.day) {
        element.color = "bg-lime-600";
      }
    });
  });

  return (
    <div className="flex flex-col gap-1 items-start border border-gray-300 p-4 rounded-lg">
      {/* Month Labels at the top */}
      <div className="grid grid-cols-12 w-full text-sm font-semibold mb-2">
        {months.map((month, i) => (
          <div key={i} className="col-span-1 text-center">
            {month.month}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div
        className="grid gap-0.5 grid-rows-7"
        style={{
          gridTemplateRows: "repeat(7, 12px)",
          gridTemplateColumns: "repeat(52, 12px)",
          gridAutoFlow: "column",
        }}
      >
        {/* Create array with 365 elements, which are mapped over to create divs */}
        {daysInYear.map((dayObj, i) => {
          return (
            <div
              key={i}
              id={dayObj.month + "/" + dayObj.day}
              className={`w-[12px] h-[12px] bg-gray-200 rounded-sm transition-colors duration-300 ${dayObj.color}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

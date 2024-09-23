const daysInMonth = (month) => {
  if (["Nov", "Jun", "Apr", "Sept"].includes(month)) return 30;
  else if (month === "Feb") return 28;
  else return 31;
};

export default function ContributionGraph() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="flex flex-col gap-1 items-start border border-gray-300 p-4 rounded-lg">
      {/* Month Labels at the top */}
      <div className="grid grid-cols-12 w-full text-sm font-semibold mb-2">
        {months.map((month, i) => (
          <div key={i} className="col-span-1 text-center">
            {month}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div
        className="grid gap-0.5 grid-rows-7"
        style={{ gridTemplateColumns: "repeat(52, 10px)" }}
      >
        {/* Create array with 365 elements, which are mapped over to create divs */}
        {[...Array(365)].map((_, i) => {
          return (
            <div
              key={i}
              className="w-[10px] h-[10px] bg-gray-200 rounded-sm transition-colors duration-300"
            ></div>
          );
        })}
      </div>
    </div>
  );
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Home() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthStartWeekday = new Date(year, month, 1).getDay();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-4">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          <span>{monthName.toUpperCase()}</span> <span className="text-zinc-400">{year}</span>
        </h1>

        <div className="grid w-full grid-cols-7 gap-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="flex h-12 items-center justify-center rounded-md text-sm font-medium text-zinc-500"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: monthStartWeekday }).map((_, index) => (
            <div
              key={`blank-${index}`}
              className="h-12 rounded-md bg-transparent"
            />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => (
            <div
              key={index}
              className="flex h-12 items-center justify-center rounded-md bg-zinc-100 text-sm font-medium"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

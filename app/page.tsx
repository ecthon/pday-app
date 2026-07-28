const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-4">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">February</h1>
        <div className="grid w-full max-w-2xl grid-cols-7 gap-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="flex h-12 items-center justify-center rounded-md text-sm font-medium text-zinc-500"
            >
              {day}
            </div>
          ))}
          {Array.from({ length: 31 }).map((_, index) => (
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

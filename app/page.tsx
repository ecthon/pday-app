import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon } from '@hugeicons/core-free-icons'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const billsPaymentDates = [
  { day: 5, title: 'MRV' },
  { day: 7, title: 'Internet' },
  { day: 8, title: 'Claro Ecthon' },
  { day: 10, title: 'Itaú' },
  { day: 15, title: 'Moradia' },
  { day: 17, title: 'Carrefour' },
  { day: 18, title: 'Inter' },
  { day: 19, title: 'Nubank' },
  { day: 20, title: 'Claro Cacá' },
  { day: 25, title: 'Amazon' },
]; // Example bill payment dates

export default function Home() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthStartWeekday = new Date(year, month, 1).getDay();
  const paymentDays = new Set(billsPaymentDates.map(({ day }) => day));

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            <span>{monthName.toUpperCase()}</span> <span className="text-zinc-400">{year}</span>
          </h1>

          <button className="flex size-10 items-center justify-center rounded-full bg-orange-300">
            <HugeiconsIcon icon={Add01Icon} size={24} color="#fff" strokeWidth={2} />
          </button>
        </div>


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

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const dayNumber = index + 1;
            const hasPayment = paymentDays.has(dayNumber);
            const isToday = dayNumber === today.getDate() && month === today.getMonth() && year === today.getFullYear();

            return (
              <div
                key={dayNumber}
                className={`flex h-12 flex-col items-center justify-center rounded-md text-sm font-medium ${hasPayment ? 'bg-orange-500 text-white shadow-sm' : 'bg-zinc-100 text-zinc-700'
                  }`}
              >
                <span>{dayNumber}</span>
                {isToday ? <span className="mt-1 h-2 w-2 border border-white rounded-full bg-orange-600" /> : <span className="mt-1 h-2 w-2" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

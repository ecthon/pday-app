'use client'

import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon } from '@hugeicons/core-free-icons'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const billsPaymentDates = [
  {
    day: 5,
    events: [
      { title: 'MRV' },
      { title: 'Água' },
    ],
  },
  {
    day: 6,
    events: [
      { title: 'MRVteclado' },
      { title: 'Água liquida' },
      { title: 'Água geladinha' },
    ],
  },
  {
    day: 7,
    events: [
      { title: 'Internet' },
    ],
  },
  {
    day: 8,
    events: [
      { title: 'Claro Ecthon' },
    ],
  },
  {
    day: 10,
    events: [
      { title: 'Itaú' },
    ],
  },
  {
    day: 15,
    events: [
      { title: 'Moradia' },
    ],
  },
  {
    day: 17,
    events: [
      { title: 'Carrefour' },
    ],
  },
  {
    day: 18,
    events: [
      { title: 'Inter' },
    ],
  },
  {
    day: 19,
    events: [
      { title: 'Nubank' },
    ],
  },
  {
    day: 20,
    events: [
      { title: 'Claro Cacá' },
    ],
  },
  {
    day: 25,
    events: [
      { title: 'Amazon' },
    ],
  },
]; // Example bill payment dates

export default function Home() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthStartWeekday = new Date(year, month, 1).getDay();
  const paymentDays = new Set(billsPaymentDates.map(({ day }) => day));
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const selectedPayment = billsPaymentDates.find((item) => item.day === selectedDay);
  const selectedEvents = selectedPayment?.events ?? [];

  return (
    <div className="flex flex-col w-full items-center justify-center bg-gray-50 p-4 space-y-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex w-full items-center space-x-2 bg-amber-50 p-2 rounded-lg">
            <p className="text-2xl font-bold text-zinc-900">{selectedDay}</p>
            <p className="text-sm text-zinc-500">{monthName} {year}</p>
          </div>
        </div>

        {selectedEvents.length > 0 ? (
          <ul className="space-y-2">
            {selectedEvents.map((event, index) => (
              <li key={`${event.title}-${index}`} className="rounded-lg bg-zinc-50 p-2">
                <p className="font-medium text-zinc-900">{event.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-500">
            Não há compromissos registrados para este dia.
          </p>
        )}
      </div>
      <div className="flex w-full items-center justify-center bg-gray-50">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              <span>{monthName.toUpperCase()}</span> <span className="text-zinc-400">{year}</span>
            </h1>

            <button className="flex size-10 items-center justify-center rounded-full bg-orange-300">
              <HugeiconsIcon icon={Add01Icon} size={20} color="#fff" strokeWidth={2} />
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
                <button
                  key={dayNumber}
                  type="button"
                  onClick={() => setSelectedDay(dayNumber)}
                  className={`flex h-12 flex-col items-center justify-center rounded-md text-sm font-medium transition ${hasPayment ? 'bg-orange-500 text-white shadow-sm hover:bg-orange-600' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    } ${selectedDay === dayNumber ? 'ring-2 ring-orange-400' : ''}`}
                >
                  <span>{dayNumber}</span>
                  {isToday ? <span className="mt-1 h-2 w-2 border border-white rounded-full bg-orange-600" /> : <span className="mt-1 h-2 w-2" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

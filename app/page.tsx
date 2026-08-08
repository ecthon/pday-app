'use client'

import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon } from '@hugeicons/core-free-icons'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const billsPaymentDates = [
  {
    day: 5,
    events: [
      { title: 'MRV', paid: false },
      { title: 'Água', paid: false },
    ],
  },
  {
    day: 6,
    events: [
      { title: 'MRVteclado', paid: false },
      { title: 'Água liquida', paid: false },
      { title: 'Água geladinha', paid: false },
    ],
  },
  {
    day: 7,
    events: [
      { title: 'Internet', paid: false },
    ],
  },
  {
    day: 8,
    events: [
      { title: 'Claro Ecthon', paid: false },
    ],
  },
  {
    day: 10,
    events: [
      { title: 'Itaú', paid: false },
    ],
  },
  {
    day: 15,
    events: [
      { title: 'Moradia', paid: false },
    ],
  },
  {
    day: 17,
    events: [
      { title: 'Carrefour', paid: false },
    ],
  },
  {
    day: 18,
    events: [
      { title: 'Inter', paid: false },
    ],
  },
  {
    day: 19,
    events: [
      { title: 'Nubank', paid: false },
    ],
  },
  {
    day: 20,
    events: [
      { title: 'Claro Cacá', paid: false },
    ],
  },
  {
    day: 25,
    events: [
      { title: 'Amazon', paid: false },
    ],
  },
]; // Example bill payment dates

export default function Home() {
  const [bills, setBills] = useState(billsPaymentDates);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString('pt-BR', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthStartWeekday = new Date(year, month, 1).getDay();
  const paymentsByDay = new Map(bills.map((item) => [item.day, item.events]));
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const selectedEvents = paymentsByDay.get(selectedDay) ?? [];

  const toggleBillPaid = (day: number, eventIndex: number) => {
    setBills((currentBills) => currentBills.map((bill) => (
      bill.day === day
        ? {
          ...bill,
          events: bill.events.map((event, index) => (
            index === eventIndex ? { ...event, paid: !event.paid } : event
          )),
        }
        : bill
    )));
  };

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
              <li key={`${event.title}-${index}`} className="flex items-center justify-between rounded-lg bg-zinc-50 p-2">
                <p className={`font-medium ${event.paid ? 'text-zinc-400 line-through' : 'text-zinc-900'}`}>{event.title}</p>
                <button
                  type="button"
                  onClick={() => toggleBillPaid(selectedDay, index)}
                  aria-pressed={event.paid}
                  className={`mt-1 text-sm ${event.paid ? 'text-blue-600' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  {event.paid ? 'Pago' : 'Pagar'}
                </button>
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
              const dayEvents = paymentsByDay.get(dayNumber) ?? [];
              const hasPayment = dayEvents.length > 0;
              const isDayFullyPaid = hasPayment && dayEvents.every((event) => event.paid);
              const isToday = dayNumber === today.getDate() && month === today.getMonth() && year === today.getFullYear();

              return (
                <button
                  key={dayNumber}
                  type="button"
                  onClick={() => setSelectedDay(dayNumber)}
                  aria-pressed={selectedDay === dayNumber}
                  className={`flex h-12 flex-col items-center justify-center rounded-md text-sm font-medium transition ${isDayFullyPaid ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-600' : hasPayment ? 'bg-orange-500 text-white shadow-sm hover:bg-orange-600' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
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

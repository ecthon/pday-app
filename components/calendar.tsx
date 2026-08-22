'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import Calendar03Icon from '@hugeicons/core-free-icons/Calendar03Icon';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

type CalendarEvent = {
  title: string;
  paid: boolean;
};

type CalendarProps = {
  year: number;
  month: number;
  selectedDay: number;
  paymentsByDay: Map<number, CalendarEvent[]>;
  onDaySelect: (day: number) => void;
};

export function Calendar({
  year,
  month,
  selectedDay,
  paymentsByDay,
  onDaySelect,
}: CalendarProps) {
  const today = new Date();
  const monthName = new Date(year, month).toLocaleString('pt-BR', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthStartWeekday = new Date(year, month, 1).getDay();

  return (
    <div className="flex w-full items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-4">
        <div className="mb-4 flex items-center space-x-2">
          <div className="flex size-10 items-center justify-center rounded-full bg-indigo-50">
            <HugeiconsIcon icon={Calendar03Icon} size={20} strokeWidth={2} className="text-indigo-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            <span>{monthName.toUpperCase()}</span> <span className="text-zinc-400">{year}</span>
          </h1>
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
                onClick={() => onDaySelect(dayNumber)}
                aria-pressed={selectedDay === dayNumber}
                className={`flex h-12 flex-col items-center justify-center rounded-md text-sm font-medium transition ${isDayFullyPaid ? 'bg-emerald-300 text-white shadow-sm hover:bg-indigo-500' : hasPayment ? 'bg-indigo-300 text-white shadow-sm hover:bg-indigo-400' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  } ${selectedDay === dayNumber ? 'ring-indigo-400' : ''}`}
              >
                <span>{dayNumber}</span>
                {isToday ? <span className="mt-1 h-2 w-2 border border-white rounded-full bg-indigo-500" /> : <span className="mt-1 h-2 w-2" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
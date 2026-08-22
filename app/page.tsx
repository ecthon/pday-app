'use client'

import { useState } from 'react'
import { Calendar } from '@/components/calendar';
import { PaymentList } from '@/components/payment-list';
import { AddPaymentDialog } from '@/components/add-payment-dialog';

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
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const selectedWeekday = new Date(year, month, selectedDay).toLocaleString('pt-BR', { weekday: 'long' });
  const paymentsByDay = new Map(bills.map((item) => [item.day, item.events]));
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

  const addEvent = (title: string) => {
    setBills((currentBills) => {
      const selectedBill = currentBills.find((bill) => bill.day === selectedDay);

      if (selectedBill) {
        return currentBills.map((bill) => (
          bill.day === selectedDay
            ? { ...bill, events: [...bill.events, { title, paid: false }] }
            : bill
        ));
      }

      return [...currentBills, { day: selectedDay, events: [{ title, paid: false }] }];
    });

    setIsAddDialogOpen(false);
  };

  return (
    <div className="flex flex-1 flex-col w-full items-center justify-center bg-gray-50 p-3 space-y-4 sm:p-4">
      <Calendar
        year={year}
        month={month}
        selectedDay={selectedDay}
        paymentsByDay={paymentsByDay}
        onDaySelect={setSelectedDay}
      />

      <div className="w-full max-w-2xl rounded-2xl bg-white p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex w-full justify-between items-center space-x-2 rounded-lg bg-indigo-50 px-3 py-2">
            <p className="text-xl font-semibold text-indigo-900 sm:text-2xl sm:font-bold">{selectedDay}</p>
            <p className="text-sm font-medium capitalize text-indigo-900 sm:text-base">{selectedWeekday}</p>
            <AddPaymentDialog
              open={isAddDialogOpen}
              selectedDay={selectedDay}
              onOpenChange={setIsAddDialogOpen}
              onAdd={addEvent}
            />
          </div>
        </div>

        <PaymentList
          events={selectedEvents}
          onTogglePaid={(eventIndex) => toggleBillPaid(selectedDay, eventIndex)}
        />
      </div>
    </div >
  );
}

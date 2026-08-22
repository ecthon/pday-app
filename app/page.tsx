'use client'

import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import CheckmarkSquare02Icon from '@hugeicons/core-free-icons/CheckmarkSquare02Icon';
import SquareIcon from '@hugeicons/core-free-icons/SquareIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { Calendar } from '@/components/calendar';

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
  const [newEventTitle, setNewEventTitle] = useState('');
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

  const addEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = newEventTitle.trim();

    if (!title) return;

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

    setNewEventTitle('');
    setIsAddDialogOpen(false);
  };

  return (
    <div className="flex flex-1 flex-col w-full items-center justify-center bg-gray-50 p-4 space-y-4">
      <Calendar
        year={year}
        month={month}
        selectedDay={selectedDay}
        paymentsByDay={paymentsByDay}
        onDaySelect={setSelectedDay}
      />

      <div className="w-full max-w-2xl rounded-2xl bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex w-full justify-between items-center space-x-2 bg-indigo-50 py-2 px-3 rounded-lg">
            <p className="text-2xl font-bold text-indigo-900">{selectedDay}</p>
            <p className="capitalize text-indigo-900">{selectedWeekday}</p>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger render={<Button className="size-8 rounded-full bg-indigo-500 text-white hover:bg-indigo-600" aria-label="Adicionar pagamento" />}>
                <PlusIcon />
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={addEvent}>
                  <DialogHeader>
                    <DialogTitle>Adicionar pagamento</DialogTitle>
                    <DialogDescription>
                      Registre um compromisso para o dia {selectedDay}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-2 py-4">
                    <Label htmlFor="event-title">Título</Label>
                    <Input
                      id="event-title"
                      value={newEventTitle}
                      onChange={(event) => setNewEventTitle(event.target.value)}
                      placeholder="Ex.: Conta de luz"
                      autoFocus
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={!newEventTitle.trim()}>
                      Adicionar à lista
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {selectedEvents.length > 0 ? (
          <ul className="space-y-2">
            {selectedEvents.map((event, index) => (
              <li key={`${event.title}-${index}`} className="flex items-center justify-between rounded-lg bg-zinc-50 py-2 px-3">
                <p className={`font-medium ${event.paid ? 'text-zinc-400 line-through' : 'text-zinc-900'}`}>{event.title}</p>
                <button
                  type="button"
                  onClick={() => toggleBillPaid(selectedDay, index)}
                  aria-pressed={event.paid}
                  className={`mt-1 text-sm ${event.paid ? 'text-blue-600' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  {event.paid
                    ? <HugeiconsIcon icon={CheckmarkSquare02Icon} size={20} strokeWidth={2} className='text-indigo-500' />
                    : <HugeiconsIcon icon={SquareIcon} size={20} strokeWidth={2} className='text-zinc-500' />
                  }
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
    </div >
  );
}

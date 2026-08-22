'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import CheckmarkSquare02Icon from '@hugeicons/core-free-icons/CheckmarkSquare02Icon';
import SquareIcon from '@hugeicons/core-free-icons/SquareIcon';

export type PaymentEvent = {
    title: string;
    paid: boolean;
};

type PaymentListProps = {
    events: PaymentEvent[];
    onTogglePaid: (eventIndex: number) => void;
};

export function PaymentList({ events, onTogglePaid }: PaymentListProps) {
    if (events.length === 0) {
        return (
            <p className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-500">
                Não há compromissos registrados para este dia.
            </p>
        );
    }

    return (
        <ul className="space-y-2">
            {events.map((event, index) => (
                <li key={`${event.title}-${index}`} className="flex items-center justify-between rounded-lg bg-zinc-50 py-2 px-3">
                    <p className={`font-medium ${event.paid ? 'text-zinc-400 line-through' : 'text-zinc-900'}`}>{event.title}</p>
                    <button
                        type="button"
                        onClick={() => onTogglePaid(index)}
                        aria-pressed={event.paid}
                        className={`mt-1 text-sm ${event.paid ? 'text-blue-600' : 'text-zinc-500 hover:text-zinc-700'}`}
                    >
                        {event.paid
                            ? <HugeiconsIcon icon={CheckmarkSquare02Icon} size={20} strokeWidth={2} className="text-indigo-500" />
                            : <HugeiconsIcon icon={SquareIcon} size={20} strokeWidth={2} className="text-zinc-500" />
                        }
                    </button>
                </li>
            ))}
        </ul>
    );
}
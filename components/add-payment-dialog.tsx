'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
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

type AddPaymentDialogProps = {
    open: boolean;
    selectedDay: number;
    onOpenChange: (open: boolean) => void;
    onAdd: (title: string) => void;
};

export function AddPaymentDialog({
    open,
    selectedDay,
    onOpenChange,
    onAdd,
}: AddPaymentDialogProps) {
    const [title, setTitle] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedTitle = title.trim();

        if (!trimmedTitle) return;

        onAdd(trimmedTitle);
        setTitle('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger render={<Button className="size-8 rounded-full bg-indigo-500 text-white hover:bg-indigo-600" aria-label="Adicionar pagamento" />}>
                <PlusIcon />
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
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
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Ex.: Conta de luz"
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={!title.trim()}>
                            Adicionar à lista
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

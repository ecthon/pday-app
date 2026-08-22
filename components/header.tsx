import { HugeiconsIcon } from '@hugeicons/react';
import { LogoutIcon } from '@hugeicons/core-free-icons';

export function Header() {
  return (
    <header className="flex items-center px-4 w-full justify-between bg-gray-50 py-4 max-w-2xl">
      <div className="flex w-full items-center gap-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-indigo-50">
          <p className="font-semibold">EB</p>
        </div>
        <h1 className="text-sm font-bold text-gray-800">Olá, Ecthon!</h1>
      </div>
      <button className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
        <HugeiconsIcon icon={LogoutIcon} size={20} strokeWidth={2} className="text-zinc-400" />
      </button>
    </header>
  );
}
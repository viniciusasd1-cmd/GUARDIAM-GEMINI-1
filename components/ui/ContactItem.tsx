import React from 'react';
import { Avatar } from './Avatar';
import { CheckCircle2, Clock, Share2 } from 'lucide-react';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatarUrl?: string;
  status?: 'active' | 'pending';
  allowEvidenceAccess?: boolean;
  notifyOnActivate?: boolean;
  notifyOnSos?: boolean;
}

interface ContactItemProps {
  contact: Contact;
  onEdit?: (contact: Contact) => void;
  onRemove?: (contact: Contact) => void;
  onResendInvite?: (contact: Contact) => void;
  id?: string;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  onEdit,
  onRemove,
  onResendInvite,
  id,
}) => {
  const isPending = contact.status === 'pending';

  return (
    <div
      id={id || `contact-item-${contact.id}`}
      className="flex items-center justify-between py-3.5 px-1 border-b border-slate-100 last:border-0"
    >
      <div className="flex items-center gap-3">
        <Avatar name={contact.name} src={contact.avatarUrl} size="md" />
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-slate-900 leading-snug">
              {contact.name}
            </span>
            {isPending ? (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" /> Pendente
              </span>
            ) : (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" /> Guardião
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500 font-normal">
            {contact.phone}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        {isPending ? (
          <button
            type="button"
            onClick={() => onResendInvite?.(contact)}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors p-0.5 cursor-pointer flex items-center gap-1"
          >
            <Share2 className="w-3 h-3" /> Reenviar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onEdit?.(contact)}
            className="text-xs font-semibold text-[#1565C0] hover:text-[#0D47A1] transition-colors p-0.5 cursor-pointer"
          >
            Editar
          </button>
        )}
        <button
          type="button"
          onClick={() => onRemove?.(contact)}
          className="text-xs font-medium text-[#DC2626] hover:text-[#B91C1C] transition-colors p-0.5 cursor-pointer"
        >
          Remover
        </button>
      </div>
    </div>
  );
};

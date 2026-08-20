import React from 'react';
import { Avatar } from './Avatar';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatarUrl?: string;
  notifyOnActivate?: boolean;
  notifyOnSos?: boolean;
}

interface ContactItemProps {
  contact: Contact;
  onEdit?: (contact: Contact) => void;
  onRemove?: (contact: Contact) => void;
  id?: string;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  onEdit,
  onRemove,
  id,
}) => {
  return (
    <div
      id={id || `contact-item-${contact.id}`}
      className="flex items-center justify-between py-3.5 px-1 border-b border-slate-100 last:border-0"
    >
      <div className="flex items-center gap-3">
        <Avatar name={contact.name} src={contact.avatarUrl} size="md" />
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-slate-900 leading-snug">
            {contact.name}
          </span>
          <span className="text-xs text-slate-500 font-normal">
            {contact.phone}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <button
          type="button"
          onClick={() => onEdit?.(contact)}
          className="text-xs font-semibold text-[#1565C0] hover:text-[#0D47A1] transition-colors p-0.5 cursor-pointer"
        >
          Editar
        </button>
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

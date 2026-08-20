import React from 'react';
import { Plus, Users } from 'lucide-react';
import { Header } from '../../../../components/layout/Header';
import { Button } from '../../../../components/ui/Button';
import { ContactItem, Contact } from '../../../../components/ui/ContactItem';

interface ContactsScreenProps {
  contacts: Contact[];
  onBack?: () => void;
  onEditContact?: (contact: Contact) => void;
  onRemoveContact?: (contact: Contact) => void;
  onAddContact?: () => void;
}

export const ContactsScreen: React.FC<ContactsScreenProps> = ({
  contacts,
  onBack,
  onEditContact,
  onRemoveContact,
  onAddContact,
}) => {
  return (
    <div
      id="screen-contacts"
      className="w-full h-full flex flex-col justify-between bg-[#F8FAFC] text-slate-900"
    >
      {/* Header */}
      <Header
        showBack={Boolean(onBack)}
        onBack={onBack}
        id="contacts-header"
      />

      <div className="flex-1 px-5 py-2 overflow-y-auto max-w-md mx-auto w-full">
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-left mb-4">
          Seus contatos<br />de confiança
        </h1>

        {/* Contacts List / Empty State */}
        {contacts.length === 0 ? (
          <div className="py-12 px-4 text-center rounded-2xl bg-white border border-slate-200/60 my-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1565C0] flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              Nenhum contato cadastrado
            </p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Adicione pessoas de confiança para serem alertadas automaticamente em caso de emergência.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-2 border border-slate-200/60 shadow-sm">
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                onEdit={onEditContact}
                onRemove={onRemoveContact}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Add Contact CTA */}
      <div className="px-5 pb-6 pt-3 max-w-md mx-auto w-full">
        <Button
          variant="primary"
          size="lg"
          id="contacts-add-button"
          onClick={onAddContact}
          leftIcon={<Plus className="w-5 h-5 stroke-[2.5]" />}
        >
          Adicionar contato
        </Button>
      </div>
    </div>
  );
};

export default ContactsScreen;

import React, { useState } from 'react';
import { Header } from '../../../../components/layout/Header';
import { Avatar } from '../../../../components/ui/Avatar';
import { Input } from '../../../../components/ui/Input';
import { Checkbox } from '../../../../components/ui/Checkbox';
import { Button } from '../../../../components/ui/Button';
import { Contact } from '../../../../components/ui/ContactItem';

interface ContactDetailScreenProps {
  contact?: Contact;
  onBack?: () => void;
  onSave?: (updatedContact: Contact) => void;
}

const defaultContact: Contact = {
  id: '1',
  name: 'Maria Silva',
  phone: '(412) 339-5678',
  avatarUrl: undefined,
  notifyOnActivate: true,
  notifyOnSos: true,
};

export const ContactDetailScreen: React.FC<ContactDetailScreenProps> = ({
  contact = defaultContact,
  onBack,
  onSave,
}) => {
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [notifyOnActivate, setNotifyOnActivate] = useState(
    contact.notifyOnActivate ?? true
  );
  const [notifyOnSos, setNotifyOnSos] = useState(
    contact.notifyOnSos ?? true
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onSave?.({
        ...contact,
        name,
        phone,
        notifyOnActivate,
        notifyOnSos,
      });
    }, 500);
  };

  return (
    <div
      id="screen-contact-detail"
      className="w-full h-full flex flex-col justify-between bg-[#F8FAFC] text-slate-900 overflow-y-auto"
    >
      {/* Header */}
      <Header
        showBack={Boolean(onBack)}
        onBack={onBack}
        id="contact-detail-header"
      />

      <div className="flex-1 px-6 py-2 space-y-6 max-w-md mx-auto w-full">
        {/* Large Avatar & Name Header */}
        <div className="flex flex-col items-center pt-2">
          <Avatar
            size="xl"
            name={name}
            src={contact.avatarUrl}
            id="contact-detail-avatar"
            className="ring-4 ring-white shadow-sm"
          />
          <h2 className="mt-4 text-xl font-bold text-slate-900 tracking-tight">
            {name || 'Nome do Contato'}
          </h2>
        </div>

        {/* Form Details Section */}
        <div className="space-y-4 bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Detalhes
          </div>

          <Input
            label="Nome"
            id="contact-detail-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do contato"
          />

          <Input
            label="Telefone"
            id="contact-detail-phone-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>

        {/* Permissions & Notifications Checkboxes */}
        <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Notificações
          </div>

          <Checkbox
            label="Receber localização ao ativar proteção"
            sublabel="Envia link seguro via SMS/WhatsApp"
            checked={notifyOnActivate}
            onChange={setNotifyOnActivate}
            id="checkbox-notify-activate"
          />

          <Checkbox
            label="Receber SOS"
            sublabel="Alerta prioritário imediato com rota"
            checked={notifyOnSos}
            onChange={setNotifyOnSos}
            id="checkbox-notify-sos"
          />
        </div>
      </div>

      {/* Footer Save Button */}
      <div className="px-6 pb-6 pt-3 max-w-md mx-auto w-full">
        <Button
          variant="primary"
          size="lg"
          id="contact-detail-save-button"
          isLoading={isSaving}
          onClick={handleSave}
        >
          Salvar alterações
        </Button>
      </div>
    </div>
  );
};

export default ContactDetailScreen;

import { useState, type FormEvent, type ReactNode } from "react";
import { leadFormSchema, type LeadFormData } from "../schemas/lead.schema";
import { maskCnpj } from "../lib/format";

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  isLoading?: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  cnpj?: string;
}

export const LeadForm = ({ onSubmit, isLoading = false }: LeadFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = leadFormSchema.safeParse({
      name,
      email,
      phone,
      company,
      cnpj,
    });
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      setErrors({
        name: flat.name?.[0],
        email: flat.email?.[0],
        cnpj: flat.cnpj?.[0],
      });
      return;
    }
    setErrors({});
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Nome do contato" required error={errors.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass(errors.name)}
            placeholder="Ex: João Silva"
          />
        </Field>

        <Field label="E-mail" error={errors.email}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass(errors.email)}
            placeholder="joao@empresa.com"
          />
        </Field>

        <Field label="Telefone">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass()}
            placeholder="(11) 99999-9999"
          />
        </Field>

        <Field label="Empresa">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass()}
            placeholder="Nome da empresa"
          />
        </Field>

        <Field
          label="CNPJ"
          required
          error={errors.cnpj}
          className="md:col-span-2"
        >
          <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(maskCnpj(e.target.value))}
            className={inputClass(errors.cnpj)}
            placeholder="00.000.000/0000-00"
            maxLength={18}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
      >
        {isLoading ? "Buscando..." : "Enriquecer lead"}
      </button>
    </form>
  );
};

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}

const Field = ({ label, required, error, className, children }: FieldProps) => (
  <div className={className}>
    <label className="mb-1 block text-sm font-medium text-slate-700">
      {label}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

const inputClass = (error?: string): string => {
  const base =
    "w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2";
  const colors = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
    : "border-slate-300 focus:border-slate-500 focus:ring-slate-200";
  return `${base} ${colors}`;
};

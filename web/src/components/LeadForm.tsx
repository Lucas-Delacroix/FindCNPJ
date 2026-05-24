import { useState, useId, type FormEvent, type ReactNode } from "react";
import { leadFormSchema, type LeadFormData } from "../schemas/lead.schema";
import { maskCnpj } from "../lib/format";

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  isLoading?: boolean;
}

interface FormErrors {
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

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const companyId = useId();
  const cnpjId = useId();
  const nameHelpId = useId();

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
        email: flat.email?.[0],
        cnpj: flat.cnpj?.[0],
      });
      return;
    }
    setErrors({});
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Field
        label="CNPJ"
        required
        error={errors.cnpj}
        htmlFor={cnpjId}
      >
        <input
          id={cnpjId}
          type="text"
          inputMode="numeric"
          value={cnpj}
          onChange={(e) => setCnpj(maskCnpj(e.target.value))}
          className={`${inputClass(errors.cnpj)} font-mono tracking-wide`}
          placeholder="00.000.000/0000-00"
          maxLength={18}
        />
      </Field>

      <Field
        label="Nome do contato"
        htmlFor={nameId}
        helperText="Para identificar o contato no QSA, se aplicável."
        helperId={nameHelpId}
      >
        <input
          id={nameId}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass()}
          placeholder="Maria Silva"
          aria-describedby={nameHelpId}
        />
      </Field>

      <SectionDivider label="Contato do lead" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="E-mail" error={errors.email} htmlFor={emailId}>
          <input
            id={emailId}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass(errors.email)}
            placeholder="maria@empresa.com"
          />
        </Field>

        <Field label="Telefone" htmlFor={phoneId}>
          <input
            id={phoneId}
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass()}
            placeholder="(11) 99999-9999"
          />
        </Field>
      </div>

      <Field label="Empresa" htmlFor={companyId}>
        <input
          id={companyId}
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass()}
          placeholder="Nome da empresa do contato"
        />
      </Field>

      <button
        type="submit"
        disabled={isLoading}
        className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-brand transition-all duration-200 hover:bg-brand-dark hover:shadow-brand-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
      >
        {isLoading ? (
          <>
            <Spinner /> Consultando...
          </>
        ) : (
          <>
            Consultar CNPJ{" "}
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              <Arrow />
            </span>
          </>
        )}
      </button>
    </form>
  );
};

interface FieldProps {
  label: string;
  required?: boolean;
  helperText?: string;
  helperId?: string;
  error?: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}

const Field = ({
  label,
  required,
  helperText,
  helperId,
  error,
  htmlFor,
  className,
  children,
}: FieldProps) => (
  <div className={className}>
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-ink-secondary"
    >
      {label}
      {required && (
        <span aria-hidden className="ml-0.5 text-brand">
          *
        </span>
      )}
    </label>
    {children}
    {helperText && !error && (
      <p
        id={helperId}
        className="mt-1.5 text-xs text-ink-muted"
      >
        {helperText}
      </p>
    )}
    {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
  </div>
);

const SectionDivider = ({ label }: { label: string }) => (
  <div
    role="separator"
    aria-label={label}
    className="flex items-center gap-3 pt-1"
  >
    <span className="text-xs font-medium text-ink-muted">{label}</span>
    <div className="h-px flex-1 bg-line-soft" aria-hidden />
  </div>
);

const inputClass = (error?: string): string => {
  const base =
    "w-full rounded-xl border bg-surface px-4 py-2.5 text-sm text-ink shadow-soft outline-none transition placeholder:text-ink-muted focus:ring-2";
  const colors = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
    : "border-line focus:border-brand focus:ring-brand/15";
  return `${base} ${colors}`;
};

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden
  >
    <path
      d="M3 7h8m0 0L7.5 3.5M11 7L7.5 10.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Spinner = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    className="animate-spin"
    aria-hidden
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      strokeOpacity="0.25"
    />
    <path
      d="M22 12a10 10 0 0 1-10 10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

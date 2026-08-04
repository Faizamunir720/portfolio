import { Barcode } from "./Barcode";

type FieldProps = {
  label: string;
  value: string;
};

function Field({ label, value }: FieldProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <span className="font-sans text-sm font-medium tracking-wide text-foreground sm:text-[15px]">
        {value}
      </span>
    </div>
  );
}

export function BoardingPass() {
  return (
    <article
      className="boarding-pass border border-hairline p-5 sm:p-6"
      aria-label="Identity boarding pass"
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
        {/* Stub / passenger side */}
        <div className="flex flex-col gap-5 sm:pr-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Boarding pass
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Gate · FM
            </span>
          </div>

          <Field label="Name" value="Faiza Munir" />
          <Field label="Role" value="Software Engineering Student" />
          <Field label="From" value="Rawalpindi, PK" />
          <Field label="Status" value="Open to Opportunities" />
        </div>

        {/* Stub / barcode side */}
        <div className="flex flex-col justify-between gap-6 sm:pl-4">
          <div className="flex flex-col gap-1">
            <span className="font-serif text-2xl leading-none tracking-tight text-foreground sm:text-3xl">
              FM
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Passenger stub
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Gate
            </span>
            <Barcode className="max-w-full overflow-hidden" />
            <span className="font-mono text-[10px] tracking-[0.12em] text-muted">
              SE · CUI · 04
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

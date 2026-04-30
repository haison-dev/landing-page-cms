import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Industry, Template } from '@/types';
import { Textarea } from '@/components/ui/textarea';

export function IndustryForm({ value, onChange, onSubmit }: { value: { name: string; slug: string }; onChange: (v: { name: string; slug: string }) => void; onSubmit: () => void }) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-4">
      <div className="flex gap-2">
        <Input value={value.name} placeholder="Industry name" onChange={(e) => onChange({ name: e.target.value, slug: e.target.value })} />
        <Button onClick={onSubmit}>Create</Button>
      </div>
    </div>
  );
}

export function TemplateForm({
  value,
  industries,
  onChange,
  onSubmit
}: {
  value: Partial<Template>;
  industries: Industry[];
  onChange: (next: Partial<Template>) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-3 rounded-2xl border bg-slate-50 p-4">
      <Input value={value.name || ''} placeholder="Template name" onChange={(e) => onChange({ ...value, name: e.target.value, slug: e.target.value })} />
      <select className="w-full rounded-lg border border-slate-300 p-2" value={(value.industryId as string) || ''} onChange={(e) => onChange({ ...value, industryId: e.target.value })}>
        <option value="">Select industry</option>
        {industries.map((i) => <option key={i._id} value={i._id}>{i.name}</option>)}
      </select>
      <Textarea rows={4} placeholder="HTML code" value={value.htmlBase || ''} onChange={(e) => onChange({ ...value, htmlBase: e.target.value })} />
      <Textarea rows={4} placeholder="CSS code" value={value.cssBase || ''} onChange={(e) => onChange({ ...value, cssBase: e.target.value })} />
      <Textarea rows={4} placeholder="JS code" value={value.jsBase || ''} onChange={(e) => onChange({ ...value, jsBase: e.target.value })} />
      <Button onClick={onSubmit}>Create Template</Button>
    </div>
  );
}

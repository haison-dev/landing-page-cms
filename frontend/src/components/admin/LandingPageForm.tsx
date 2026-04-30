import { useMemo } from 'react';
import { Industry, LandingPage, Template } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { PreviewFrame } from '@/components/editor/PreviewFrame';
import { ImageUpload } from './ImageUpload';

export function LandingPageForm({
  value,
  industries,
  templates,
  onChange,
  onUpload,
  onSaveDraft,
  onPublish,
  onUpdate
}: {
  value: Partial<LandingPage>;
  industries: Industry[];
  templates: Template[];
  onChange: (next: Partial<LandingPage>) => void;
  onUpload: (key: 'thumbnailUrl' | 'mockupUrl', file: File) => Promise<void>;
  onSaveDraft: () => void;
  onPublish: () => void;
  onUpdate: () => void;
}) {
  const filteredTemplates = useMemo(() => templates.filter((t) => String(typeof t.industryId === 'string' ? t.industryId : t.industryId._id) === value.industryId), [templates, value.industryId]);

  return (
    <div className="space-y-4 rounded-2xl border bg-slate-50 p-4">
      <Input placeholder="Title" value={value.title || ''} onChange={(e) => onChange({ ...value, title: e.target.value, slug: e.target.value })} />
      <select className="w-full rounded-lg border border-slate-300 p-2" value={typeof value.industryId === 'string' ? value.industryId : value.industryId?._id || ''} onChange={(e) => onChange({ ...value, industryId: e.target.value })}>
        <option value="">Select industry</option>
        {industries.map((i) => <option key={i._id} value={i._id}>{i.name}</option>)}
      </select>
      <select
        className="w-full rounded-lg border border-slate-300 p-2"
        onChange={(e) => {
          const tpl = filteredTemplates.find((t) => t._id === e.target.value);
          if (!tpl) return;
          onChange({ ...value, htmlCode: tpl.htmlBase, cssCode: tpl.cssBase, jsCode: tpl.jsBase });
        }}
      >
        <option value="">Apply template</option>
        {filteredTemplates.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
      </select>
      <Textarea placeholder="Short description" value={value.shortDescription || ''} onChange={(e) => onChange({ ...value, shortDescription: e.target.value })} />
      <div className="grid gap-3 md:grid-cols-2">
        <ImageUpload previewUrl={value.thumbnailUrl} onUpload={(f) => onUpload('thumbnailUrl', f)} />
        <ImageUpload previewUrl={value.mockupUrl} onUpload={(f) => onUpload('mockupUrl', f)} />
      </div>
      <CodeEditor
        htmlCode={value.htmlCode || ''}
        cssCode={value.cssCode || ''}
        jsCode={value.jsCode || ''}
        onChange={(key, code) => onChange({ ...value, [key]: code })}
      />
      <PreviewFrame htmlCode={value.htmlCode || ''} cssCode={value.cssCode || ''} jsCode={value.jsCode || ''} />
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={onSaveDraft}>Save Draft</Button>
        <Button type="button" onClick={onPublish}>Publish</Button>
        <Button type="button" onClick={onUpdate}>Update</Button>
      </div>
    </div>
  );
}


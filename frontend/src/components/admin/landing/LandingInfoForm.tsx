import { useMemo, useState } from 'react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { FormSection } from '@/components/admin/common/FormSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Industry, LandingPage, Template } from '@/types';

export function LandingInfoForm({
  value,
  industries,
  templates,
  onChange,
  onUpload
}: {
  value: Partial<LandingPage>;
  industries: Industry[];
  templates: Template[];
  onChange: (next: Partial<LandingPage>) => void;
  onUpload: (key: 'thumbnailUrl' | 'mockupUrl', file: File) => Promise<void>;
}) {
  const [selectedTemplateId, setSelectedTemplateId] = useState('');

  const industryId = typeof value.industryId === 'string' ? value.industryId : value.industryId?._id || '';

  const availableTemplates = useMemo(() => {
    if (!industryId) return templates;
    return templates.filter((t) => String(typeof t.industryId === 'string' ? t.industryId : t.industryId._id) === industryId);
  }, [templates, industryId]);

  return (
    <FormSection title="Thông tin landing page" description="Nhập thông tin cơ bản và media trước khi chỉnh code.">
      <div className="space-y-1">
        <label className="text-sm font-medium">Title</label>
        <Input value={value.title || ''} onChange={(e) => onChange({ ...value, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Slug</label>
        <Input value={value.slug || ''} onChange={(e) => onChange({ ...value, slug: e.target.value })} />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Industry</label>
        <select className="w-full rounded-lg border border-slate-300 p-2" value={industryId} onChange={(e) => onChange({ ...value, industryId: e.target.value })}>
          <option value="">Chọn lĩnh vực</option>
          {industries.map((i) => <option key={i._id} value={i._id}>{i.name}</option>)}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Template</label>
        <select
          className="w-full rounded-lg border border-slate-300 p-2"
          value={selectedTemplateId}
          onChange={(e) => {
            const templateId = e.target.value;
            setSelectedTemplateId(templateId);
            const tpl = templates.find((t) => t._id === templateId);
            if (!tpl) return;
            const tplIndustryId = typeof tpl.industryId === 'string' ? tpl.industryId : tpl.industryId._id;
            onChange({
              ...value,
              industryId: industryId || tplIndustryId,
              htmlCode: tpl.htmlBase,
              cssCode: tpl.cssBase,
              jsCode: tpl.jsBase
            });
          }}
        >
          <option value="">Chọn template</option>
          {availableTemplates.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>
        {!industryId ? <p className="text-xs text-slate-500">Bạn có thể chọn template trước, hệ thống sẽ tự gán lĩnh vực theo template.</p> : null}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Mô tả ngắn</label>
        <Textarea rows={3} value={value.shortDescription || ''} onChange={(e) => onChange({ ...value, shortDescription: e.target.value })} />
      </div>
      <ImageUpload previewUrl={value.thumbnailUrl} onUpload={(f) => onUpload('thumbnailUrl', f)} />
      <ImageUpload previewUrl={value.mockupUrl} onUpload={(f) => onUpload('mockupUrl', f)} />
    </FormSection>
  );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  onUpload: (file: File) => Promise<void>;
  previewUrl?: string;
};

export function ImageUpload({ onUpload, previewUrl }: Props) {
  const [uploading, setUploading] = useState(false);

  return (
    <div className="space-y-2">
      {previewUrl ? <img src={previewUrl} className="h-32 w-full rounded-lg border object-cover" /> : null}
      <div className="flex gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setUploading(true);
            await onUpload(file);
            setUploading(false);
          }}
        />
        <Button type="button" variant="secondary" disabled>{uploading ? 'Uploading...' : 'Ready'}</Button>
      </div>
    </div>
  );
}

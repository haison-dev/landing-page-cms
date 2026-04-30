import { useMemo } from 'react';

type Props = {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  className?: string;
};

export function PreviewFrame({ htmlCode, cssCode, jsCode, className }: Props) {
  const srcDoc = useMemo(() => `<!doctype html><html><head><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`, [htmlCode, cssCode, jsCode]);
  return <iframe className={className || 'h-[360px] w-full rounded-lg border bg-white'} sandbox="allow-scripts" srcDoc={srcDoc} title="preview" />;
}

import { memo } from 'react';
import Editor from '@monaco-editor/react';

type Props = {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  onChange: (key: 'htmlCode' | 'cssCode' | 'jsCode', value: string) => void;
};

export const CodeEditor = memo(function CodeEditor({ htmlCode, cssCode, jsCode, onChange }: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Editor height="260px" defaultLanguage="html" value={htmlCode} onChange={(v) => onChange('htmlCode', v || '')} />
      <Editor height="260px" defaultLanguage="css" value={cssCode} onChange={(v) => onChange('cssCode', v || '')} />
      <Editor height="260px" defaultLanguage="javascript" value={jsCode} onChange={(v) => onChange('jsCode', v || '')} />
    </div>
  );
});

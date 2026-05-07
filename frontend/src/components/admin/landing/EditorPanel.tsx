import { useState, memo } from 'react';
import Editor from '@monaco-editor/react';
import { Maximize2, Eye, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PreviewFrame } from '@/components/editor/PreviewFrame';

export const EditorPanel = memo(function EditorPanel({
  html,
  css,
  js,
  onChange
}: {
  html: string;
  css: string;
  js: string;
  onChange: (next: { htmlCode: string; cssCode: string; jsCode: string }) => void;
}) {
  const [tab, setTab] = useState<'html' | 'css' | 'js'>('html');
  const [fullscreen, setFullscreen] = useState(false);
  const [mode, setMode] = useState<'code' | 'preview'>('code');

  const value = tab === 'html' ? html : tab === 'css' ? css : js;
  const language = tab === 'html' ? 'html' : tab === 'css' ? 'css' : 'javascript';

  return (
    <div className={`rounded-2xl border bg-white p-4 ${fullscreen ? 'fixed inset-4 z-50 shadow-2xl' : ''}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-2">
          {mode === 'code'
            ? (['html', 'css', 'js'] as const).map((t) => (
                <button
                  key={t}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === t ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                  onClick={() => setTab(t)}
                >
                  {t.toUpperCase()}
                </button>
              ))
            : <span className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white">LIVE PREVIEW</span>}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" type="button" onClick={() => setMode((m) => (m === 'code' ? 'preview' : 'code'))}>
            {mode === 'code' ? <><Eye className="mr-1 h-4 w-4" />Preview</> : <><Code2 className="mr-1 h-4 w-4" />Code</>}
          </Button>
          <Button variant="ghost" type="button" onClick={() => setFullscreen((s) => !s)}><Maximize2 className="h-4 w-4" /></Button>
        </div>
      </div>

      {mode === 'code' ? (
        <Editor
          height={fullscreen ? 'calc(100vh - 150px)' : 'calc(100vh - 290px)'}
          language={language}
          value={value}
          onChange={(next) => {
            const safe = next || '';
            if (tab === 'html') onChange({ htmlCode: safe, cssCode: css, jsCode: js });
            if (tab === 'css') onChange({ htmlCode: html, cssCode: safe, jsCode: js });
            if (tab === 'js') onChange({ htmlCode: html, cssCode: css, jsCode: safe });
          }}
        />
      ) : (
        <PreviewFrame
          htmlCode={html}
          cssCode={css}
          jsCode={js}
          className={fullscreen ? 'h-[calc(100vh-150px)] w-full rounded-lg border bg-white' : 'h-[calc(100vh-290px)] min-h-[620px] w-full rounded-lg border bg-white'}
        />
      )}
    </div>
  );
});

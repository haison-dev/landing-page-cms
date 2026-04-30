import { LandingPage } from '@/types';
import { DataTable } from '@/components/admin/common/DataTable';
import { Button } from '@/components/ui/button';

export function LandingPagesDataTable({
  items,
  selected,
  onToggle,
  onToggleAll,
  onView,
  onEdit,
  onDelete
}: {
  items: LandingPage[];
  selected: string[];
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onView: (item: LandingPage) => void;
  onEdit: (item: LandingPage) => void;
  onDelete: (item: LandingPage) => void;
}) {
  const allChecked = items.length > 0 && selected.length === items.length;

  return (
    <DataTable>
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="px-3 py-2"><input type="checkbox" checked={allChecked} onChange={onToggleAll} /></th>
            <th className="px-3 py-2">Thumbnail</th>
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Industry</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Updated</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const industry = typeof item.industryId === 'string' ? item.industryId : item.industryId.name;
            const checked = selected.includes(item._id);
            return (
              <tr key={item._id} className="border-t">
                <td className="px-3 py-2"><input type="checkbox" checked={checked} onChange={() => onToggle(item._id)} /></td>
                <td className="px-3 py-2">{item.thumbnailUrl ? <img src={item.thumbnailUrl} className="h-10 w-14 rounded object-cover" /> : <div className="h-10 w-14 rounded bg-slate-100" />}</td>
                <td className="px-3 py-2 font-medium text-slate-900">{item.title}</td>
                <td className="px-3 py-2">{industry}</td>
                <td className="px-3 py-2"><span className={`rounded-full px-2 py-1 text-xs font-medium ${item.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{item.status}</span></td>
                <td className="px-3 py-2">{new Date((item as unknown as { updatedAt?: string }).updatedAt || Date.now()).toLocaleDateString('vi-VN')}</td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => onView(item)}>View</Button>
                    <Button variant="secondary" onClick={() => onEdit(item)}>Edit</Button>
                    <Button variant="danger" onClick={() => onDelete(item)}>Delete</Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DataTable>
  );
}

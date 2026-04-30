import { LandingPage } from '@/types';
import { Button } from '@/components/ui/button';

export function LandingPageTable({
  items,
  onPublish,
  onEdit,
  onDelete
}: {
  items: LandingPage[];
  onPublish: (id: string) => void;
  onEdit: (item: LandingPage) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Industry</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="px-3 py-2">{item.title}</td>
              <td className="px-3 py-2">{typeof item.industryId === 'string' ? item.industryId : item.industryId.name}</td>
              <td className="px-3 py-2">{item.status}</td>
              <td className="px-3 py-2">
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => onEdit(item)}>Edit</Button>
                  {item.status !== 'published' ? <Button onClick={() => onPublish(item._id)}>Publish</Button> : null}
                  <Button variant="danger" onClick={() => onDelete(item._id)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

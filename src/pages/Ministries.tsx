
import { MainLayout } from "@/components/layout/MainLayout";

export default function Ministries() {
  return (
    <MainLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-church-primary">Ministries</h1>
          <p className="text-church-secondary">
            Manage all church ministries and activities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample ministry cards */}
          {['Youth Ministry', 'Worship Team', 'Sunday School', 'Outreach', 'Prayer Team', 'Hospitality'].map((ministry) => (
            <div 
              key={ministry} 
              className="bg-white rounded-lg border border-church-border p-6 shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-medium mb-2">{ministry}</h3>
              <p className="text-church-secondary text-sm mb-4">
                Description of the {ministry.toLowerCase()} and its activities.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Active</span>
                <span className="text-xs text-church-secondary">12 members</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6 px-4 pt-6 md:px-6">
      {/* PageHeader skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-48 rounded-[var(--radius)] bg-muted" />
        <div className="h-4 w-72 rounded-[var(--radius)] bg-muted" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 rounded-[var(--radius)] border border-border bg-white p-4"
          >
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-[var(--radius)] bg-muted" />
              <div className="ml-auto h-4 w-12 rounded-[var(--radius)] bg-muted" />
            </div>
            <div className="mt-2 space-y-1">
              <div className="h-6 w-16 rounded-[var(--radius)] bg-muted" />
              <div className="h-3 w-20 rounded-[var(--radius)] bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* Main content skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-[var(--radius)] border border-border bg-white p-4">
            <div className="mb-4 h-5 w-36 rounded-[var(--radius)] bg-muted" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 border-t border-border py-3">
                <div className="size-10 rounded-[var(--radius)] bg-muted" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-32 rounded-[var(--radius)] bg-muted" />
                  <div className="h-3 w-24 rounded-[var(--radius)] bg-muted" />
                  <div className="h-1.5 w-full rounded-[var(--radius)] bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-[var(--radius)] border border-border bg-white p-4">
            <div className="mb-4 h-5 w-28 rounded-[var(--radius)] bg-muted" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 border-t border-border py-3">
                <div className="size-8 rounded-[var(--radius)] bg-muted" />
                <div className="flex-1 space-y-1">
                  <div className="h-4 w-24 rounded-[var(--radius)] bg-muted" />
                  <div className="h-3 w-32 rounded-[var(--radius)] bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

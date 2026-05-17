export default function Loading() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="aspect-square rounded-3xl bg-muted/60" />
      <div className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-6">
        <div className="h-4 w-20 rounded-full bg-muted" />
        <div className="h-8 w-56 rounded-full bg-muted" />
        <div className="h-5 w-40 rounded-full bg-muted" />
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="h-16 rounded-2xl bg-muted" />
          <div className="h-16 rounded-2xl bg-muted" />
          <div className="h-16 rounded-2xl bg-muted" />
          <div className="h-16 rounded-2xl bg-muted" />
        </div>
      </div>
    </div>
  );
}

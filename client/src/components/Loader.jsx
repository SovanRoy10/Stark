export default function Loader() {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative">
        <span class="loader"></span>
      </div>
      <p className="text-sm text-muted-foreground">
        Stark is thinking...
      </p>
    </div>
  );
}

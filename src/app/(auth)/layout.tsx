export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f8f9ff] px-4">
      {/* Background graphic elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute right-[-19.5px] top-[-88px] size-[400px] rounded-xl bg-[#86f2e4] blur-[50px]" />
        <div className="absolute bottom-[-88px] left-[-19.5px] size-[500px] rounded-xl bg-[#dae2fd] blur-[60px]" />
      </div>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to Chat App 💬
        </h1>

        <p className="text-muted-foreground text-lg">
          Connect instantly, chat freely, and stay in touch with the people that
          matter.
        </p>
      </div>
    </div>
  );
}

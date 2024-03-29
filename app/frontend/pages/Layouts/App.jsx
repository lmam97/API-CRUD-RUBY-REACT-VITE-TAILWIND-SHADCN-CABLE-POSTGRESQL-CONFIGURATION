const LayoutApp = page => {
  return (
    <div className="flex max-w-7xl mx-auto">
      <main className="w-full">
        { page }
      </main>
    </div>
  );
};

export default LayoutApp;
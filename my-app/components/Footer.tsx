export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6 mt-12">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Anass Azdad. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}

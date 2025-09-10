
export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enkel de children renderen, geen Footer of Navbar hier
  return <div className="flex-1">{children}</div>;
}

/** Displays success or error messages to the user*/
export default function Message({ message }) {
  if (!message || !message.text) {
    return null;
  }

  const bgColor = message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div className={`mb-4 p-4 rounded ${bgColor}`}>
      {message.text}
    </div>
  );consol
}

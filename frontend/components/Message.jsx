export default function Message({ message }) {
  if (!message || !message.text) {
    return null;
  }

  const isSuccess = message.type === 'success';
  const bgColor = isSuccess ? 'bg-green-100' : 'bg-red-100';
  const textColor = isSuccess ? 'text-green-800' : 'text-red-800';

  return (
    <div className={`mb-6 p-4 rounded-lg ${bgColor} ${textColor}`}>
      <p className="font-medium">{message.text}</p>
    </div>
  );
}

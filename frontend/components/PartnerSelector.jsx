export default function PartnerSelector({ partners, selectedPartner, onPartnerChange, loading }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Select Partner</h2>
      <select
        value={selectedPartner}
        onChange={(e) => onPartnerChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled={loading}
      >
        <option value="">-- Select a Partner --</option>
        {partners.map((partner) => (
          <option key={partner.id} value={partner.id}>
            {partner.company_name} - {partner.address}
          </option>
        ))}
      </select>
      {loading && <p className="text-sm text-gray-500 mt-2">Loading partners...</p>}
    </div>
  );
}

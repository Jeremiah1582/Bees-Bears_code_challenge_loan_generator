/**Allow user to select a partner from a dropdown*/

export default function PartnerSelector({ partners, selectedPartner, onPartnerChange, loading }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Select Partner</h2>
      <select
        value={selectedPartner}
        onChange={(e) => onPartnerChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      >
        <option value="">-- Select a Partner --</option>
        {partners.map((partner) => (
          <option key={partner.id} value={partner.id}>
            {partner.company_name} - {partner.address}
          </option>
        ))}
      </select>
    </div>
  );
}

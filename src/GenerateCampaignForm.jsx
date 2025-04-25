import { useState } from 'react';

export default function GenerateCampaignForm() {
  const [formData, setFormData] = useState({
    user_id: '',
    occasion_type: 'campaign',
    number_of_people: 1,
    std_percent: 0,
    start_time: '',
    end_time: '',
    max_scans: 1,
    logo: '',
    url: 'https://lumia-analytics.com'
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/generateLimitedCampaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Generate QR Campaign</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-2 rounded" name="user_id" placeholder="User ID" onChange={handleChange} required />
        <select name="occasion_type" onChange={handleChange} className="border p-2 rounded">
          <option value="single">Single</option>
          <option value="campaign" selected>Campaign</option>
        </select>
        <input className="border p-2 rounded" name="number_of_people" type="number" placeholder="Number of People" onChange={handleChange} />
        <input className="border p-2 rounded" name="std_percent" type="number" placeholder="Std %" onChange={handleChange} />
        <input className="border p-2 rounded" name="start_time" type="datetime-local" onChange={handleChange} />
        <input className="border p-2 rounded" name="end_time" type="datetime-local" onChange={handleChange} />
        <input className="border p-2 rounded" name="max_scans" type="number" placeholder="Max Scans" onChange={handleChange} />
        <input className="border p-2 rounded col-span-2" name="logo" placeholder="Logo Base64 (optional)" onChange={handleChange} />
        <input className="border p-2 rounded col-span-2" name="url" placeholder="Redirect URL" onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded col-span-2 hover:bg-blue-700">Generate</button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Response</h3>
          <pre className="text-left">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

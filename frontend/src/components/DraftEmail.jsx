import { useState } from 'react';
import axios from 'axios';

export default function DraftEmail() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [context, setContext] = useState('');
  const [response, setResponse] = useState('');

  const handleDraft = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/email/draft', {
        to,
        subject,
        context
      });

      console.log('✅ Draft Email:', res.data.draft);
      setResponse(res.data.draft);
    } catch (error) {
      console.error('❌ Frontend Axios error:', error);
      setResponse('Error generating email draft. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F1C2C] to-[#928DAB] flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">AI Email Draft Generator</h2>

        {/* Recipient Email Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Recipient Email</label>
        <input
          type="email"
          placeholder="recipient@example.com"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />

        {/* Subject Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
        <input
          type="text"
          placeholder="Meeting Reminder"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />

        {/* Context Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Email Content</label>
        <textarea
          placeholder="Email content"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />

        <button
          onClick={handleDraft}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Draft and Send Email
        </button>

        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-md font-semibold text-gray-700 mb-2">AI Generated Email:</h3>
            <pre className="whitespace-pre-wrap text-gray-800">{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

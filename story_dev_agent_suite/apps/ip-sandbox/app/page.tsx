'use client';

import { useState } from 'react';

export default function Home() {
    const [metadataUri, setMetadataUri] = useState('');
    const [ipId, setIpId] = useState('');
    const [licenseTermsId, setLicenseTermsId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('register');

    const handleRegister = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ metadataUri }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to register');
            setIpId(data.ipId);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateLicense = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/license/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'non-commercial' }), // Default for demo
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to create license');
            setLicenseTermsId(data.licenseTermsId);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAttachLicense = async () => {
        if (!ipId || !licenseTermsId) {
            setError('IP ID and License Terms ID are required');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/license/attach', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ipId, licenseTermsId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to attach license');
            alert('License attached successfully!');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-4xl font-bold mb-8">IP Sandbox</h1>

            <div className="flex space-x-4 mb-8">
                <button onClick={() => setActiveTab('register')} className={`px-4 py-2 rounded ${activeTab === 'register' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>Register IP</button>
                <button onClick={() => setActiveTab('license')} className={`px-4 py-2 rounded ${activeTab === 'license' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>Manage Licenses</button>
                <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>Dashboard</button>
            </div>

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                {activeTab === 'register' && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">Register IP Asset</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Metadata URI</label>
                            <input
                                type="text"
                                value={metadataUri}
                                onChange={(e) => setMetadataUri(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                placeholder="https://..."
                            />
                        </div>
                        <button
                            onClick={handleRegister}
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Register IP'}
                        </button>
                    </>
                )}

                {activeTab === 'license' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">1. Create License Terms</h2>
                            <button
                                onClick={handleCreateLicense}
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                            >
                                Create Non-Commercial Terms
                            </button>
                            {licenseTermsId && <p className="mt-2 text-xs text-gray-500 break-all">Terms ID: {licenseTermsId}</p>}
                        </div>

                        <div className="border-t pt-4">
                            <h2 className="text-xl font-semibold mb-2">2. Attach License to IP</h2>
                            <input
                                type="text"
                                value={ipId}
                                onChange={(e) => setIpId(e.target.value)}
                                className="mb-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border"
                                placeholder="IP Asset ID"
                            />
                            <input
                                type="text"
                                value={licenseTermsId}
                                onChange={(e) => setLicenseTermsId(e.target.value)}
                                className="mb-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border"
                                placeholder="License Terms ID"
                            />
                            <button
                                onClick={handleAttachLicense}
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                            >
                                Attach License
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold mb-2">Explorer Lookup</h2>
                        <p className="text-sm text-gray-600 mb-4">View your IP Assets on the Story Protocol Aeneid Explorer.</p>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">IP Asset ID</label>
                            <div className="flex mt-1">
                                <input
                                    type="text"
                                    value={ipId}
                                    onChange={(e) => setIpId(e.target.value)}
                                    className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    placeholder="0x..."
                                />
                                <a
                                    href={`https://aeneid.storyscan.io/ipa/${ipId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white ${ipId ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
                                >
                                    View
                                </a>
                            </div>
                        </div>

                        <div className="mt-8 border-t pt-4">
                            <h3 className="font-medium text-gray-900">Useful Links</h3>
                            <ul className="mt-2 list-disc list-inside text-sm text-blue-600 space-y-1">
                                <li><a href="https://aeneid.storyscan.io/" target="_blank">Block Explorer</a></li>
                                <li><a href="https://docs.story.foundation/" target="_blank">Story Documentation</a></li>
                                <li><a href="https://app.abv.dev/" target="_blank">ABV Dashboard</a></li>
                            </ul>
                        </div>
                    </div>
                )}

                {error && <p className="mt-4 text-red-600">{error}</p>}
                {ipId && activeTab === 'register' && (
                    <div className="mt-4 p-4 bg-green-50 rounded-md">
                        <p className="text-green-800 font-medium">Success!</p>
                        <p className="text-sm text-green-700 break-all">IP ID: {ipId}</p>
                        <a href={`https://aeneid.storyscan.io/ipa/${ipId}`} target="_blank" className="text-xs text-blue-600 underline mt-1 block">View on Explorer</a>
                    </div>
                )}
            </div>
        </main>
    );
}

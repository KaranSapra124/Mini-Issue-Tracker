import React, { useState } from "react";

const CreateIssueModal = ({ setModal }) => {
    const [issue, setIssue] = useState({
        title: "",
        description: "",
        priority: "",
        status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setIssue((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Create a New Issue
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Add details about the issue you want to track.
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Title
                        </label>

                        <input
                            type="text"
                            value={issue?.title}
                            name="title"
                            onChange={handleChange}
                            placeholder="Enter issue title"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Description
                        </label>

                        <textarea
                            value={issue?.description}
                            onChange={handleChange}
                            rows="4"
                            name="description"
                            placeholder="Describe the issue..."
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    {/* Priority & Status */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* Priority */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Priority
                            </label>

                            <select name="priority"
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            >
                                <option value="">Select priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Status
                            </label>

                            <select name="status" onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            >
                                <option value="">Select status</option>
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex justify-end gap-3">
                    <button onClick={() => setModal(false)} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                        Cancel
                    </button>

                    <button className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800">
                        Create Issue
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CreateIssueModal;

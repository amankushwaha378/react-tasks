function Task2() {
    return (
        <div>
            <h1 className="text-2xl font-bold">
                Sidebar
            </h1>

            <p className="mt-2 text-gray-600">
                This is the Sidebar component used for
                navigation throughout this application.
            </p>

            <div className="mt-6 rounded-lg border p-6">
                <h2 className="text-lg font-semibold">
                    Features
                </h2>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-600">
                    <li>Responsive navigation</li>
                    <li>Collapsible desktop sidebar</li>
                    <li>Mobile navigation</li>
                    <li>Active route highlighting</li>
                    <li>Reusable link configuration</li>
                </ul>
            </div>
        </div>
    );
}

export default Task2;
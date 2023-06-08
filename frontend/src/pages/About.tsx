


export default function About() {
  return (
    <div className="bg-base-100">
      <div className="container mx-auto py-8">
        <h1 className="mb-4 text-3xl font-bold">
          About Our File Conversion Web App
        </h1>
        <p className="mb-8 text-lg ">
          Our File Conversion Web App is designed to provide a seamless and
          efficient file conversion experience. Here's what sets us apart:
        </p>
        <ul className="mb-8 list-inside list-disc">
          <li className="mb-2">Fast and reliable file conversions</li>
          <li className="mb-2">Support for a wide range of file formats</li>
          <li className="mb-2">User-friendly interface for easy navigation</li>
          <li className="mb-2">
            Strict privacy and security measures to protect your data
          </li>
          <li className="mb-2">Cross-platform compatibility for convenience</li>
        </ul>
        <div className="rounded bg-blue-500 p-4 text-white">
          <h2 className="mb-2 text-2xl font-bold">
            Ready to convert your files?
          </h2>
          <p className="text-lg">
            Try our File Conversion Web App today and experience the power and
            convenience of effortless file conversions.
          </p>
          <button className="mt-4 rounded bg-yellow-400 px-4 py-2 font-bold text-white hover:bg-yellow-500">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

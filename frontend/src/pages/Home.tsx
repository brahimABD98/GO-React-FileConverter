export default function Home() {
  return (
    <>
      <div className="h-full w-full" data-theme="night">
        <div className="bg-base-100">
          <div className="container mx-auto py-8">
            <h1 className="mb-4 text-3xl font-bold">
              Welcome to our File Conversion Web App!
            </h1>
            <p className="mb-8 text-lg">
              With our powerful tool, you can convert files of various formats
              with just a few clicks. Whether you need to convert documents,
              images, audio files, or videos, we've got you covered. Simply
              upload your file, select the desired output format, and let our
              advanced algorithms work their magic.
            </p>
            <div className="flex flex-wrap justify-center">
              <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
                <h2 className="mb-2 text-2xl font-bold">Fast and Reliable</h2>
                <p className="">
                  Our app is built on robust technology that ensures quick and
                  accurate file conversions. Say goodbye to long waiting times
                  and hello to efficiency.
                </p>
              </div>
              <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
                <h2 className="mb-2 text-2xl font-bold">
                  Wide Range of Formats
                </h2>
                <p className="">
                  We support a wide array of file formats, allowing you to
                  convert between different document types, image formats, audio
                  codecs, and video containers. Whatever your conversion needs,
                  we've got the format for you.
                </p>
              </div>
              <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
                <h2 className="mb-2 text-2xl font-bold">
                  User-Friendly Interface
                </h2>
                <p className="">
                  Our intuitive interface makes it easy for anyone to navigate
                  and use the app. No technical expertise is required—simply
                  follow the simple steps, and your file will be converted in no
                  time.
                </p>
              </div>
              <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
                <h2 className="mb-2 text-2xl font-bold">
                  Privacy and Security
                </h2>
                <p className="">
                  We understand the importance of your data's privacy. Rest
                  assured that your files are securely handled during the
                  conversion process. We prioritize your confidentiality and
                  employ stringent security measures to protect your
                  information.
                </p>
              </div>
              <div className="w-full p-4">
                <h2 className="mb-2 text-2xl font-bold">
                  Cross-Platform Compatibility
                </h2>
                <p className="">
                  Our File Conversion Web App works seamlessly on all major
                  operating systems and devices. Whether you're on a Windows PC,
                  Mac, or mobile device, you can access our app from anywhere,
                  at any time.
                </p>
              </div>
            </div>
            <button className="mt-8 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

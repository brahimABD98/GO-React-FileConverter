import { useRef, useState } from "react";

interface DropDownOption {
  id: number;
  value: string;
}

const ConvertImages = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const formatRef = useRef<HTMLSelectElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setSelectedImages(files);
  };

  const options: DropDownOption[] = [
    { value: "png", id: 0 },
    { value: "jpeg", id: 1 },
    { value: "jpg", id: 2 },
    { value: "gif", id: 3 },
    { value: "tif", id: 4 },
    { value: "tiff", id: 5 },
    { value: "bmp", id: 6 },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const selectedFormat = formatRef.current?.value;
    if (!selectedFormat) return;

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("file", image);
    });

    try {
      const response = await fetch(`http://localhost:1100/image/multiple/${selectedFormat}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType === "application/zip") {
          const blob = await response.blob();
          const blobURL = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobURL;
          link.download = "file.zip";
          link.click();
          URL.revokeObjectURL(blobURL);
        } else {
          const text = await response.text();
          console.log(text);
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start lg:p-32">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Convert Images</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex w-full flex-col items-center justify-center">
        <div className="flex w-1/2 flex-col items-center justify-center p-2">
          <input
            type="file"
            name="file"
            className="file-input-bordered file-input w-full max-w-xs"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div className="p-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Pick the desired file format</span>
            </label>
            <select className="select-bordered select w-full max-w-xs" ref={formatRef}>
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn" type="submit">
          Convert
        </button>
      </form>
    </div>
  );
};

export default ConvertImages;

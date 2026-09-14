'use client';

import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange([...value, result.info.secure_url]);
  };

  const onRemove = (url: string) => {
    onChange(value.filter((val) => val !== url));
  };

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return (
      <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
        <p className="text-sm text-neutral-400 mb-2">Cloudinary is not configured. Using text input instead.</p>
        <input 
          type="text" 
          value={value[0] || ''} 
          onChange={(e) => onChange([e.target.value])} 
          className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white" 
          placeholder="https://example.com/image.jpg"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        {value.map((url) => (
          <div key={url} className="relative w-32 h-32 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900">
            <div className="absolute top-1 right-1 z-10">
              <button 
                type="button" 
                onClick={() => onRemove(url)}
                className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600"
              >
                ✕
              </button>
            </div>
            <img src={url} alt="Upload" className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
      
      <CldUploadWidget onUpload={onUpload} uploadPreset="ironmarket">
        {({ open }) => {
          const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            open();
          };

          return (
            <button 
              type="button"
              onClick={onClick}
              className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 px-4 py-2 rounded-lg text-sm transition"
            >
              + Upload Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

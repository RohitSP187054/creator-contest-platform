
import React, { useState, useRef } from 'react';
import { useToast } from '../hooks/useToast';
import { UploadIcon, FilmIcon } from './icons/Icons';

export const VideoUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'video/mp4') {
        setSelectedFile(file);
      } else {
        addToast('Invalid file type. Please upload an MP4 video.', 'error');
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate a reliable upload process
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          addToast('Video submitted successfully!', 'success');
          setSelectedFile(null);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">Upload Your Entry</h1>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors"
        onClick={triggerFileSelect}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="video/mp4"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <div className="flex flex-col items-center justify-center text-gray-500">
          <UploadIcon className="w-12 h-12 mb-4" />
          <p className="font-semibold">Click to upload or drag and drop</p>
          <p className="text-sm">MP4 videos only</p>
        </div>
      </div>
      {selectedFile && !isUploading && (
        <div className="mt-6 p-4 bg-light rounded-lg flex items-center justify-between">
            <div className="flex items-center">
                <FilmIcon className="w-6 h-6 text-primary mr-3" />
                <span className="font-medium text-gray-700">{selectedFile.name}</span>
            </div>
            <button
                onClick={handleUpload}
                className="bg-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors"
            >
                Submit
            </button>
        </div>
      )}
      {isUploading && (
        <div className="mt-6">
          <p className="text-center font-medium mb-2">Uploading...</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-accent h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

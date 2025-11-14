'use client';
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import FileInput from '../input/FileInput';
import Label from '../Label';

export default function FileInputExample() {
  const [fileName, setFileName] = useState<string>('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file?.name || '');
  };

  return (
    <ComponentCard title="File Input">
      <div>
        <Label>Upload file</Label>
        <FileInput onChange={handleFileChange} className="custom-class" />
        {fileName && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Selected file:
            {' '}
            {fileName}
          </p>
        )}
      </div>
    </ComponentCard>
  );
}

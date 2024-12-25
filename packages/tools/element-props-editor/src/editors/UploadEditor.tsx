import { ImageIcon, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';

type UploadEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  description?: string;
  accept?: string;
  maxSize?: number;
};

export const UploadEditor = ({
  value,
  onChange,
  label,
  description,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024,
}: UploadEditorProps) => {
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > maxSize) {
      // [TODO] -
      console.error('File is too large');
      return;
    }

    // [TODO] -
    const fakeUploadedUrl = URL.createObjectURL(file);
    onChange(fakeUploadedUrl);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      console.error('File is too large');
      return;
    }

    const fakeUploadedUrl = URL.createObjectURL(file);
    onChange(fakeUploadedUrl);
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="yoo-elements-upload-wrapper yoo-elements-flex yoo-elements-flex-col yoo-elements-space-y-2">
      <Label className="yoo-elements-upload-label yoo-elements-text-xs yoo-elements-font-medium yoo-elements-text-gray-700">
        {label}
        {description && (
          <span className="yoo-elements-upload-description yoo-elements-text-xs yoo-elements-font-normal yoo-elements-text-gray-500 yoo-elements-ml-1">
            ({description})
          </span>
        )}
      </Label>

      <Dialog>
        <DialogTrigger className="yoo-elements-upload-trigger yoo-elements-w-full">
          {value ? (
            <div className="yoo-elements-upload-preview yoo-elements-relative yoo-elements-w-full yoo-elements-aspect-video yoo-elements-rounded-md yoo-elements-overflow-hidden yoo-elements-border yoo-elements-border-gray-200 yoo-elements-group">
              <img src={value} alt="Uploaded image" className="object-cover" />
              <div className="yoo-elements-upload-overlay yoo-elements-absolute yoo-elements-inset-0 yoo-elements-bg-black/50 yoo-elements-opacity-0 group-hover:yoo-elements-opacity-100 yoo-elements-transition-opacity yoo-elements-flex yoo-elements-items-center yoo-elements-justify-center">
                <ImageIcon className="yoo-elements-text-white yoo-elements-w-6 yoo-elements-h-6" />
              </div>
            </div>
          ) : (
            <div className="yoo-elements-upload-placeholder yoo-elements-w-full yoo-elements-aspect-video yoo-elements-rounded-md yoo-elements-border-2 yoo-elements-border-dashed yoo-elements-border-gray-200 hover:yoo-elements-border-gray-300 yoo-elements-transition-colors yoo-elements-flex yoo-elements-flex-col yoo-elements-items-center yoo-elements-justify-center yoo-elements-gap-2">
              <Upload className="yoo-elements-w-6 yoo-elements-h-6 yoo-elements-text-gray-400" />
              <span className="yoo-elements-text-xs yoo-elements-text-gray-500">Click to upload image</span>
            </div>
          )}
        </DialogTrigger>

        <DialogContent className="sm:yoo-elements-max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload image</DialogTitle>
            <DialogDescription>Drag and drop your image here or click to browse</DialogDescription>
          </DialogHeader>

          <div
            className="yoo-elements-upload-dropzone yoo-elements-mt-4 yoo-elements-p-8 yoo-elements-border-2 yoo-elements-border-dashed yoo-elements-border-gray-200 yoo-elements-rounded-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              className="yoo-elements-upload-input hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="yoo-elements-upload-label yoo-elements-flex yoo-elements-flex-col yoo-elements-items-center yoo-elements-justify-center yoo-elements-gap-4 yoo-elements-cursor-pointer"
            >
              <Upload className="yoo-elements-w-8 yoo-elements-h-8 yoo-elements-text-gray-400" />
              <div className="yoo-elements-text-center">
                <p className="yoo-elements-text-sm yoo-elements-text-gray-600">
                  Drag and drop your image here or click to browse
                </p>
                <p className="yoo-elements-text-xs yoo-elements-text-gray-500 yoo-elements-mt-1">
                  Maximum file size: {Math.round(maxSize / (1024 * 1024))}MB
                </p>
              </div>
            </label>
          </div>

          {value && (
            <div className="yoo-elements-upload-actions yoo-elements-mt-4 yoo-elements-flex yoo-elements-justify-end">
              <button
                onClick={handleRemove}
                className="yoo-elements-upload-remove yoo-elements-flex yoo-elements-items-center yoo-elements-gap-2 yoo-elements-text-sm yoo-elements-text-red-600 hover:yoo-elements-text-red-700"
              >
                <X className="yoo-elements-w-4 yoo-elements-h-4" />
                Remove image
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

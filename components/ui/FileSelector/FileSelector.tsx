"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { FiPaperclip, FiX } from "react-icons/fi";
import {
  ClipIcon,
  DropText,
  DropZone,
  FileItem,
  FileList,
  HiddenInput,
  PickerLabel,
} from "./FileSelector.style";
import { FormValuesType } from "@/types/Form";

interface FileSelectorProps {
  label: string;
  name: keyof FormValuesType;
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  files: File[];
  removeFile: (name: keyof FormValuesType, index: number) => void;
  remove: string;
  hint?: string;
  pickLabel?: string;
}

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

const FileSelector = ({
  label,
  name,
  multiple = true,
  onChange,
  files,
  removeFile,
  remove,
  hint,
  pickLabel,
}: FileSelectorProps) => (
  <div>
    <DropZone>
      <ClipIcon>
        <FiPaperclip aria-hidden="true" size={19} />
      </ClipIcon>

      <DropText>
        <strong>{label}</strong>
        {hint && <span>{hint}</span>}
      </DropText>

      <HiddenInput
        type="file"
        id={name}
        name={name}
        multiple={multiple}
        onChange={onChange}
      />
      <PickerLabel htmlFor={name}>{pickLabel ?? label}</PickerLabel>
    </DropZone>

    {files && files.length > 0 && (
      <FileList>
        <AnimatePresence initial={false}>
          {files.map((file, index) => (
            <FileItem
              key={`${file.name}-${index}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
            >
              <span>{file.name}</span>
              <small>{formatSize(file.size)}</small>
              <button
                type="button"
                onClick={() => removeFile(name, index)}
                aria-label={`${remove}: ${file.name}`}
              >
                <FiX aria-hidden="true" size={15} strokeWidth={2.4} />
              </button>
            </FileItem>
          ))}
        </AnimatePresence>
      </FileList>
    )}
  </div>
);

export default FileSelector;

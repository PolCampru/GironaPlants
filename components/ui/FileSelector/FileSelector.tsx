import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileSelectorWrapper } from "./FileSelector.style";
import { FormValuesType } from "@/types/Form";
import Image from "next/image";

interface FileSelectorProps {
  label: string;
  name: keyof FormValuesType;
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  files: File[];
  removeFile: (name: keyof FormValuesType, index: number) => void;
  remove: string;
}

const FileSelector = ({
  label,
  name,
  multiple = true,
  onChange,
  files,
  removeFile,
  remove,
}: FileSelectorProps) => {
  return (
    <FileSelectorWrapper>
      <div className="container-label">
        <Image src="/images/clip.svg" alt="Clip" width={24} height={24} />
        <label htmlFor={name}>{label}</label>
      </div>

      <input
        type="file"
        id={name}
        name={name}
        multiple={multiple}
        onChange={onChange}
      />

      {files && files.length > 0 && (
        <AnimatePresence>
          <motion.ul
            className="file-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {files &&
              files.map((file, index) => (
                <motion.li
                  key={index}
                  className="file-item"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeFile(name, index)}
                  >
                    {remove}
                  </button>
                </motion.li>
              ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </FileSelectorWrapper>
  );
};

export default FileSelector;

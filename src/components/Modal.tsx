// src/components/Modal.tsx
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4  backdrop-blur-sm"
          onClick={onClose} // Fecha o modal ao clicar fora
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative"
            onClick={(e) => e.stopPropagation()} // Impede que o clique dentro feche o modal
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
            <div className="text-gray-700 mb-6">
              {children}
            </div>
            <div className="flex justify-end">
			{/*<button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Entendi
	  </button> */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

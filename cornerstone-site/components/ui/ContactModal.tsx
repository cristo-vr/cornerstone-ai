import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ContactForm from './ContactForm';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-brand-black border border-neutral-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-none relative shadow-2xl shadow-black">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-brand-gray hover:text-brand-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="mb-10 text-center">
                                    <h2 className="text-3xl font-bold text-brand-white mb-2">Audit Your Capacity</h2>
                                    <p className="text-brand-gray">Tell us about your operations. We'll identify where you can scale.</p>
                                </div>

                                <ContactForm />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;

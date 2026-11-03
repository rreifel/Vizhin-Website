import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ExternalLink, Download, X } from 'lucide-react';

interface BrochureViewerProps {
  initialOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  brochureUrl?: string;
  title?: string;
}

export const BROCHURE_PDF_URL = '/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf';

export default function BrochureViewer({
  initialOpen = false,
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  className = '',
  brochureUrl = BROCHURE_PDF_URL,
  title = 'Sublime x Vizhin GTM Assessment Brochure'
}: BrochureViewerProps) {
  const [internalOpen, setInternalOpen] = useState(initialOpen);

  const isControlled = typeof controlledIsOpen === 'boolean';
  const showBrochure = isControlled ? controlledIsOpen : internalOpen;

  const handleClose = () => {
    if (controlledOnToggle) {
      controlledOnToggle();
    } else {
      setInternalOpen(false);
    }
  };

  if (!showBrochure) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: 12, height: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950/90 shadow-2xl ${className}`}
      >
        {/* Top Viewer Control Bar */}
        <div className="p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-850 bg-neutral-900/40 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-mono text-neutral-200 font-semibold text-xs md:text-sm">
              {title}
            </span>
            <span className="hidden md:inline font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
              2-Page Executive Document
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 hover:bg-neutral-850 text-emerald-400 border border-neutral-800 hover:border-emerald-600/60 flex items-center gap-1.5 transition-colors cursor-pointer group"
              title="Open full PDF in a new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Open in New Tab</span>
            </a>

            <a
              href={brochureUrl}
              download="Vizhin_GTM_Assessment.pdf"
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/60 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download PDF document"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              type="button"
              onClick={handleClose}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1"
              title="Close PDF brochure viewer"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>
        </div>

        {/* Embedded High-Fidelity PDF Viewer Container */}
        <div className="p-3 md:p-4 bg-neutral-950">
          <div className="w-full h-[650px] md:h-[850px] lg:h-[950px] rounded-xl overflow-hidden border border-neutral-850 bg-[#1e1e1e] relative">
            <object
              data={`${brochureUrl}#view=FitH&toolbar=1`}
              type="application/pdf"
              className="w-full h-full"
              title={title}
            >
              <iframe
                src={`${brochureUrl}#view=FitH`}
                className="w-full h-full border-0"
                title={title}
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4 text-neutral-300">
                  <FileText className="w-12 h-12 text-emerald-400" />
                  <p className="text-sm font-medium">Your browser does not support inline PDF viewing.</p>
                  <div className="flex items-center gap-3">
                    <a
                      href={brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Brochure in New Tab</span>
                    </a>
                    <a
                      href={brochureUrl}
                      download="Vizhin_GTM_Assessment.pdf"
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </iframe>
            </object>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

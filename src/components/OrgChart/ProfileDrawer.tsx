import React from 'react';
import { UserProfile } from '../../orgTypes';
import { useOrg } from '../../context/OrgContext';
import { 
  getAncestryChain, 
  evaluateReviewAccess, 
  isSuperAdmin 
} from '../../services/rbacService';
import { 
  X, 
  Mail, 
  MapPin, 
  Calendar, 
  Building, 
  ShieldCheck, 
  ShieldAlert, 
  GitBranch, 
  Users, 
  Share2, 
  ExternalLink 
} from 'lucide-react';

interface ProfileDrawerProps {
  user: UserProfile | null;
  onClose: () => void;
  onSelectUser: (user: UserProfile) => void;
  onOpenReview: (revieweeId: string) => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  user,
  onClose,
  onSelectUser,
  onOpenReview,
}) => {
  const { users, userMap, evaluations, delegations, currentViewer } = useOrg();

  if (!user) return null;

  const ancestry = getAncestryChain(user.id, userMap);
  const directReports = users.filter((u) => u.manager_id === user.id);
  const dottedReports = users.filter((u) => u.dotted_line_manager_id === user.id);
  const directManager = user.manager_id ? userMap.get(user.manager_id) : null;
  const dottedManager = user.dotted_line_manager_id ? userMap.get(user.dotted_line_manager_id) : null;

  // Active review evaluation for this user
  const latestReview = evaluations.find((e) => e.reviewee_id === user.id) || null;

  // Evaluate RBAC for current viewer
  const accessResult = evaluateReviewAccess(
    currentViewer,
    user,
    latestReview,
    delegations,
    userMap
  );

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-neutral-950 shadow-2xl border-l border-slate-200 dark:border-neutral-800 flex flex-col transition-all duration-200 ease-in-out">
      
      {/* Drawer Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between bg-slate-50 dark:bg-neutral-900">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
            Employee Profile
          </span>
          {isSuperAdmin(user) && (
            <span className="text-[10px] bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 font-semibold px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800/60">
              God Mode Admin
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 dark:text-neutral-500 hover:text-slate-700 dark:hover:text-white p-1 rounded-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Identity & Basic Info */}
        <div className="space-y-2">
          <div className="w-14 h-14 rounded-full bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
            {user.first_name[0]}{user.last_name[0]}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-xs font-medium text-slate-600 dark:text-neutral-400">
              {user.title}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-neutral-400 pt-1">
            <span className="font-medium text-slate-700 dark:text-neutral-200">{user.department}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{user.worker_type.replace('_', ' ')}</span>
            <span aria-hidden="true">·</span>
            <span className={`font-medium ${user.status === 'active' ? 'text-[#0D5C46] dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
              {user.status === 'active' ? 'Active' : 'On Leave'}
            </span>
          </div>

          {user.bio && (
            <p className="text-xs text-slate-600 dark:text-neutral-300 pt-2 leading-relaxed bg-slate-50 dark:bg-neutral-900 p-2.5 rounded border border-slate-100 dark:border-neutral-800">
              {user.bio}
            </p>
          )}
        </div>

        {/* Meta details list */}
        <div className="space-y-2 text-xs border-t border-slate-100 dark:border-neutral-800 pt-4">
          <div className="flex items-center gap-2 text-slate-600 dark:text-neutral-400">
            <Mail className="w-4 h-4 text-slate-400 dark:text-neutral-500 shrink-0" />
            <span className="font-mono text-slate-800 dark:text-neutral-200">{user.work_email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-neutral-400">
            <MapPin className="w-4 h-4 text-slate-400 dark:text-neutral-500 shrink-0" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-neutral-400">
            <Calendar className="w-4 h-4 text-slate-400 dark:text-neutral-500 shrink-0" />
            <span>Started {user.start_date}</span>
          </div>
        </div>

        {/* Ancestry Chain (Vertical Reporting Line) */}
        <div className="border-t border-slate-100 dark:border-neutral-800 pt-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
            <GitBranch className="w-4 h-4 text-slate-500 dark:text-neutral-400" />
            <span>Chain of Command (Ancestry)</span>
          </div>
          
          <div className="text-xs space-y-1.5 pl-2 border-l-2 border-slate-200 dark:border-neutral-800">
            {ancestry.length === 0 ? (
              <div className="text-slate-500 dark:text-neutral-500 text-[11px] italic">
                Root Executive (Reports to Board / Shareholders)
              </div>
            ) : (
              ancestry.slice().reverse().map((ancestor, i) => (
                <div 
                  key={ancestor.id}
                  onClick={() => onSelectUser(ancestor)}
                  className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 dark:hover:bg-neutral-900 cursor-pointer transition-colors"
                >
                  <div>
                    <span className="font-medium text-slate-800 dark:text-neutral-200">
                      {ancestor.first_name} {ancestor.last_name}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-neutral-500 block">
                      {ancestor.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-mono">
                    L-{ancestry.length - i}
                  </span>
                </div>
              ))
            )}
            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/50 rounded font-semibold text-[#0D5C46] dark:text-emerald-300 text-xs">
              → {user.first_name} {user.last_name} ({user.title})
            </div>
          </div>
        </div>

        {/* Reporting Relationships */}
        <div className="border-t border-slate-100 dark:border-neutral-800 pt-4 space-y-3">
          
          {/* Direct Manager */}
          {directManager && (
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                Direct Manager (Vertical Ancestor)
              </span>
              <div 
                onClick={() => onSelectUser(directManager)}
                className="flex items-center justify-between p-2 rounded-md border border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 cursor-pointer bg-white dark:bg-neutral-900 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">
                    {directManager.first_name} {directManager.last_name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400">
                    {directManager.title}
                  </div>
                </div>
                <Users className="w-4 h-4 text-slate-400 dark:text-neutral-500" />
              </div>
            </div>
          )}

          {/* Dotted Line Manager */}
          {dottedManager && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                  Dotted-Line Manager
                </span>
                <span className="text-[10px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-1 rounded">
                  No review visibility
                </span>
              </div>
              <div 
                onClick={() => onSelectUser(dottedManager)}
                className="flex items-center justify-between p-2 rounded-md border border-dashed border-slate-300 dark:border-neutral-700 hover:border-slate-400 dark:hover:border-neutral-600 cursor-pointer bg-slate-50/50 dark:bg-neutral-900/50 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">
                    {dottedManager.first_name} {dottedManager.last_name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400">
                    {dottedManager.title} ({dottedManager.department})
                  </div>
                </div>
                <Share2 className="w-4 h-4 text-slate-400 dark:text-neutral-500" />
              </div>
            </div>
          )}

          {/* Direct Reports */}
          {directReports.length > 0 && (
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                Direct Reports ({directReports.length})
              </span>
              <div className="space-y-1">
                {directReports.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => onSelectUser(report)}
                    className="flex items-center justify-between p-2 rounded border border-slate-200 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-900 cursor-pointer transition-colors text-xs"
                  >
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-neutral-200">
                        {report.first_name} {report.last_name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-neutral-400 block">
                        {report.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-mono">
                      {report.worker_type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dotted Reports */}
          {dottedReports.length > 0 && (
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                Dotted-Line Reports ({dottedReports.length})
              </span>
              <div className="space-y-1">
                {dottedReports.map((dReport) => (
                  <div
                    key={dReport.id}
                    onClick={() => onSelectUser(dReport)}
                    className="flex items-center justify-between p-2 rounded border border-dashed border-slate-300 dark:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-900 cursor-pointer transition-colors text-xs"
                  >
                    <div>
                      <span className="font-medium text-slate-800 dark:text-neutral-200">
                        {dReport.first_name} {dReport.last_name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-neutral-400 block">
                        {dReport.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PERFORMANCE REVIEW ACCESS INSPECTOR */}
        <div className="border-t border-slate-200 dark:border-neutral-800 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0D5C46] dark:text-emerald-400" />
              <span>Performance Review Access</span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-neutral-400">
              For {currentViewer?.first_name}
            </span>
          </div>

          <div className={`p-3 rounded-lg border text-xs space-y-2 ${
            accessResult.canView 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-950 dark:text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-semibold">
              {accessResult.canView ? (
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
              <span>{accessResult.canView ? 'Visibility Granted' : 'Visibility Restricted'}</span>
            </div>

            <p className="text-[11px] leading-relaxed">
              {accessResult.reason}
            </p>

            {accessResult.delegation && (
              <div className="bg-white/80 dark:bg-neutral-900 p-2 rounded text-[11px] border border-emerald-300 dark:border-emerald-800">
                <span className="font-semibold block">Active Relational Delegation:</span>
                <span>Window: {accessResult.delegation.start_date} to {accessResult.delegation.end_date}</span>
                <span className="block text-slate-600 dark:text-neutral-400 italic mt-0.5">"{accessResult.delegation.notes}"</span>
              </div>
            )}

            {accessResult.canView && (
              <button
                onClick={() => onOpenReview(user.id)}
                className="w-full mt-2 py-1.5 px-3 bg-[#0D5C46] hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Open Evaluation Record</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Drawer Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-right">
        <button
          onClick={onClose}
          className="px-4 py-1.5 text-xs font-medium text-slate-700 dark:text-neutral-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded hover:bg-slate-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
        >
          Close Drawer
        </button>
      </div>

    </div>
  );
};

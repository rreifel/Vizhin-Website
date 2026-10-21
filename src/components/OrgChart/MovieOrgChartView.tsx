import React, { useState, useMemo } from 'react';
import { MOVIE_100_EMPLOYEES, MovieEmployee } from '../../orgData/movieOrg100';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Search, 
  Users, 
  ChevronRight, 
  ArrowLeft,
  Clapperboard,
  Filter,
  ShieldCheck,
  Building2,
  X,
  Mail,
  Briefcase
} from 'lucide-react';

interface MovieOrgChartViewProps {
  onBackToLogin: () => void;
}

export const MovieOrgChartView: React.FC<MovieOrgChartViewProps> = ({ onBackToLogin }) => {
  const [rootId, setRootId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<MovieEmployee | null>(null);
  const [zoomScale, setZoomScale] = useState(0.85);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [movieFilter, setMovieFilter] = useState('ALL');
  
  // Track expanded nodes; default top 3 levels expanded
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    MOVIE_100_EMPLOYEES.forEach(e => {
      // Expand top level executives and directors by default
      if (['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9'].includes(e.id)) {
        initial[e.id] = true;
      }
    });
    return initial;
  });

  const employeeMap = useMemo(() => {
    const map = new Map<string, MovieEmployee>();
    MOVIE_100_EMPLOYEES.forEach(e => map.set(e.id, e));
    return map;
  }, []);

  const defaultRoot = useMemo(() => {
    return MOVIE_100_EMPLOYEES.find(e => e.manager_id === null) || MOVIE_100_EMPLOYEES[0];
  }, []);

  const activeRoot = useMemo(() => {
    if (rootId && employeeMap.has(rootId)) {
      return employeeMap.get(rootId)!;
    }
    return defaultRoot;
  }, [rootId, employeeMap, defaultRoot]);

  // Reports grouped by manager
  const reportsByManager = useMemo(() => {
    const map = new Map<string, MovieEmployee[]>();
    MOVIE_100_EMPLOYEES.forEach(e => {
      if (e.manager_id) {
        const list = map.get(e.manager_id) || [];
        list.push(e);
        map.set(e.manager_id, list);
      }
    });
    return map;
  }, []);

  const departments = useMemo(() => {
    const set = new Set(MOVIE_100_EMPLOYEES.map(e => e.department));
    return Array.from(set).sort();
  }, []);

  const movies = useMemo(() => {
    const set = new Set(MOVIE_100_EMPLOYEES.map(e => e.movie));
    return Array.from(set).sort();
  }, []);

  // Ancestry chain for breadcrumbs
  const ancestryChain = useMemo(() => {
    if (!activeRoot) return [];
    const chain: MovieEmployee[] = [];
    let curr: MovieEmployee | undefined = activeRoot;
    while (curr && curr.manager_id) {
      curr = employeeMap.get(curr.manager_id);
      if (curr) chain.unshift(curr);
    }
    return chain;
  }, [activeRoot, employeeMap]);

  const toggleExpand = (id: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const all: Record<string, boolean> = {};
    MOVIE_100_EMPLOYEES.forEach(e => {
      all[e.id] = true;
    });
    setExpandedNodes(all);
  };

  const handleCollapseAll = () => {
    setExpandedNodes({});
  };

  // Search matches
  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return MOVIE_100_EMPLOYEES.filter(e => 
      `${e.first_name} ${e.last_name}`.toLowerCase().includes(q) ||
      e.title.toLowerCase().includes(q) ||
      e.movie.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  // Render a branch of the tree recursively
  const renderBranch = (node: MovieEmployee, level: number = 0): React.ReactNode => {
    const children = reportsByManager.get(node.id) || [];
    const hasChildren = children.length > 0;
    const isExpanded = expandedNodes[node.id] ?? false;

    // Filter children based on department or movie if applied
    const filteredChildren = children.filter(child => {
      if (departmentFilter !== 'ALL' && child.department !== departmentFilter) {
        // Keep child if its subtree matches
        const hasMatchingDescendant = (mId: string): boolean => {
          const direct = reportsByManager.get(mId) || [];
          return direct.some(d => d.department === departmentFilter || hasMatchingDescendant(d.id));
        };
        if (!hasMatchingDescendant(child.id)) return false;
      }
      return true;
    });

    const isSelected = selectedUser?.id === node.id;
    const isRoot = node.id === activeRoot.id;

    return (
      <div key={node.id} className="flex flex-col items-center">
        
        {/* Node Card */}
        <div
          onClick={() => setSelectedUser(node)}
          className={`w-60 bg-white rounded-xl border-2 transition-all cursor-pointer select-none text-left p-3 relative hover:shadow-xl hover:border-slate-900 ${
            isSelected
              ? 'ring-2 ring-emerald-500 border-emerald-600 shadow-lg'
              : isRoot
              ? 'border-slate-900 shadow-md ring-1 ring-slate-900/60'
              : 'border-slate-300 hover:border-slate-700 shadow-sm'
          }`}
        >
          {/* Header row: Department & Movie Tag */}
          <div className="flex items-center justify-between text-[10px] mb-1.5 gap-1">
            <span className="font-extrabold text-slate-700 tracking-wider uppercase truncate">
              {node.department}
            </span>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300 font-mono text-[9px] font-bold shrink-0">
              <Clapperboard className="w-2.5 h-2.5 text-emerald-600" />
              <span className="truncate max-w-[85px]">{node.movie}</span>
            </span>
          </div>

          {/* User Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
              {node.first_name[0]}{node.last_name[0]}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-black text-black truncate leading-tight">
                {node.first_name} {node.last_name}
              </h4>
              <p className="text-[10px] font-semibold text-slate-800 truncate leading-tight mt-0.5">
                {node.title}
              </p>
            </div>
          </div>

          {/* Footer bar: Directs count & Expand Toggle */}
          <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px]">
            <span className="font-bold text-slate-800">
              {hasChildren ? `${children.length} direct${children.length === 1 ? '' : 's'}` : 'Individual Contributor'}
            </span>

            <div className="flex items-center gap-1.5">
              {node.id !== activeRoot.id && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRootId(node.id);
                  }}
                  className="text-[9px] text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                  title="Focus view on this subtree"
                >
                  Focus
                </button>
              )}

              {hasChildren && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(node.id);
                  }}
                  className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[9px] font-bold border border-slate-300"
                >
                  {isExpanded ? `Hide (${children.length})` : `Show (${children.length})`}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Child branches */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col items-center w-full">
            {/* Vertical stem down */}
            <div className="w-[2px] h-6 bg-slate-700"></div>

            {/* Horizontal branch line */}
            <div className="flex justify-center relative">
              {filteredChildren.map((child, index) => {
                const isOnly = filteredChildren.length === 1;
                const isFirst = index === 0;
                const isLast = index === filteredChildren.length - 1;

                return (
                  <div key={child.id} className="flex flex-col items-center px-2 sm:px-3 relative">
                    {!isOnly && (
                      <>
                        <div
                          className={`absolute top-0 left-0 right-1/2 h-[2px] ${
                            isFirst ? 'bg-transparent' : 'bg-slate-700'
                          }`}
                        />
                        <div
                          className={`absolute top-0 left-1/2 right-0 h-[2px] ${
                            isLast ? 'bg-transparent' : 'bg-slate-700'
                          }`}
                        />
                      </>
                    )}

                    {/* Stem down into child card */}
                    <div className="w-[2px] h-6 bg-slate-700"></div>

                    {/* Recursive branch */}
                    {renderBranch(child, level + 1)}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] min-h-[700px] bg-slate-200 select-none overflow-hidden relative">
      
      {/* Top Filter and Navigation Bar */}
      <div className="bg-white border-b border-slate-300 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-xs z-20">
        
        {/* Left: Back to Login & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToLogin}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span>Back to Login & Account Setup</span>
          </button>

          <div className="h-4 w-px bg-slate-300 hidden sm:block" />

          {rootId && (
            <button
              type="button"
              onClick={() => setRootId(null)}
              className="text-xs text-slate-700 hover:text-black font-semibold flex items-center gap-1 hover:underline"
            >
              <span>Full Org View</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600">
            {ancestryChain.map((p) => (
              <React.Fragment key={p.id}>
                <button
                  onClick={() => setRootId(p.id)}
                  className="hover:text-black font-medium"
                >
                  {p.first_name} {p.last_name}
                </button>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </React.Fragment>
            ))}
            <span className="font-bold text-black">
              {activeRoot.first_name} {activeRoot.last_name}
            </span>
            <span className="text-slate-500 font-mono text-[11px]">({activeRoot.title})</span>
          </div>
        </div>

        {/* Middle: Search bar */}
        <div className="relative w-64 sm:w-72">
          <div className="flex items-center bg-slate-100 rounded-lg px-2.5 py-1.5 border border-slate-300 focus-within:border-slate-800 focus-within:bg-white transition-colors">
            <Search className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100 movie figures..."
              className="text-xs bg-transparent border-0 focus:outline-none w-full text-black placeholder:text-slate-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-black">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Search Dropdown Matches */}
          {searchMatches.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-xl shadow-xl p-1.5 z-50 max-h-60 overflow-y-auto">
              {searchMatches.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedUser(m);
                    setRootId(m.id);
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-black">{m.first_name} {m.last_name}</p>
                    <p className="text-[10px] text-slate-600">{m.title} · {m.department}</p>
                  </div>
                  <span className="text-[9px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-300 font-bold">
                    {m.movie}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Controls: Department Filter & Zoom */}
        <div className="flex items-center gap-2">
          
          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-white border border-slate-300 text-slate-800 font-semibold py-1 px-2.5 rounded-lg text-xs focus:outline-none"
          >
            <option value="ALL">All Departments (100)</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Expand/Collapse All */}
          <button
            type="button"
            onClick={handleExpandAll}
            className="px-2 py-1 text-xs text-slate-700 hover:text-black bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded font-semibold transition-colors hidden sm:block"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="px-2 py-1 text-xs text-slate-700 hover:text-black bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded font-semibold transition-colors hidden sm:block"
          >
            Collapse All
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block" />

          {/* Zoom controls */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-300">
            <button
              onClick={() => setZoomScale((prev) => Math.max(0.4, prev - 0.1))}
              className="p-1 text-slate-700 hover:text-black rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1 text-slate-800 font-bold">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => setZoomScale((prev) => Math.min(1.4, prev + 0.1))}
              className="p-1 text-slate-700 hover:text-black rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomScale(0.85)}
              className="p-1 text-slate-500 hover:text-black ml-1"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>

      {/* Main Interactive Canvas with distinct light grey background */}
      <div className="flex-1 overflow-auto p-12 flex justify-center items-start relative cursor-grab active:cursor-grabbing bg-slate-200">
        
        {/* Crisp grid pattern background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Tree Container with Zoom transform */}
        <div 
          className="relative transition-transform duration-100 origin-top"
          style={{ transform: `scale(${zoomScale})` }}
        >
          {renderBranch(activeRoot)}
        </div>

      </div>

      {/* Slide-over Profile Drawer for Selected Movie Employee */}
      {selectedUser && (
        <div className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-white border-l border-slate-300 shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-wider">
                Executive Profile
              </span>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-black text-base shadow-sm">
                {selectedUser.first_name[0]}{selectedUser.last_name[0]}
              </div>
              <div>
                <h3 className="text-base font-black text-black">
                  {selectedUser.first_name} {selectedUser.last_name}
                </h3>
                <p className="text-xs font-semibold text-slate-700">
                  {selectedUser.title}
                </p>
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300 font-mono text-[10px] font-bold text-slate-800">
                  <Clapperboard className="w-3 h-3 text-emerald-600" />
                  <span>{selectedUser.movie}</span>
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Department</span>
                <span className="font-bold text-black">{selectedUser.department}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Corporate Email</span>
                <span className="font-mono text-slate-900">{selectedUser.email}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">RBAC Security Role</span>
                <span className="font-mono text-emerald-700 font-bold uppercase text-[10px]">
                  {selectedUser.role}
                </span>
              </div>

              {selectedUser.manager_id && employeeMap.has(selectedUser.manager_id) && (
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Reports To</span>
                  <button
                    onClick={() => setSelectedUser(employeeMap.get(selectedUser.manager_id!)!)}
                    className="font-bold text-black hover:text-emerald-700 hover:underline"
                  >
                    {employeeMap.get(selectedUser.manager_id!)!.first_name} {employeeMap.get(selectedUser.manager_id!)!.last_name}
                  </button>
                </div>
              )}
            </div>

            {/* Direct Reports Section in Drawer */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-black mb-2 flex items-center justify-between">
                <span>Direct Reports</span>
                <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 text-slate-700 font-bold">
                  {(reportsByManager.get(selectedUser.id) || []).length}
                </span>
              </h4>

              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {(reportsByManager.get(selectedUser.id) || []).map((rep) => (
                  <button
                    key={rep.id}
                    onClick={() => setSelectedUser(rep)}
                    className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-black">{rep.first_name} {rep.last_name}</p>
                      <p className="text-[10px] text-slate-600 truncate max-w-[170px]">{rep.title}</p>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 shrink-0">
                      {rep.movie}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                setRootId(selectedUser.id);
                setSelectedUser(null);
              }}
              className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
            >
              Focus Hierarchy on {selectedUser.first_name}
            </button>
          </div>

        </div>
      )}

    </div>
  );
};


let allIssues = [];

// Spinner loading
const toggleLoading = (isLoading) => {
    const spinner = document.getElementById('loading-spinner');
    const container = document.getElementById('issue-container');
    if (isLoading) {
        spinner?.classList.remove('hidden');
        container?.classList.add('hidden');
    } else {
        spinner?.classList.add('hidden');
        container?.classList.remove('hidden');
    }
};


//  API Call

const fetchIssues = async () => {
    toggleLoading(true);
    try {
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const data = await res.json();
        allIssues = Array.isArray(data) ? data : (data.data || []);
        displayIssues(allIssues);
        
        // পেজ লোড হওয়ার পর ডিফল্টভাবে 'All' বাটনকে একটিভ কালার দেওয়া
        updateButtonStyles(document.getElementById('btn-all'));
    } catch (err) {
        console.error("Fetch Error:", err);
    } finally {
        toggleLoading(false);
    }
};

// Button Section 

const updateButtonStyles = (activeBtn) => {
    const btnAll = document.getElementById('btn-all');
    const btnOpen = document.getElementById('btn-open');
    const btnClosed = document.getElementById('btn-closed');

    
    [btnAll, btnOpen, btnClosed].forEach(btn => {
        if (btn) {
            btn.classList.remove('bg-[#4f00ff]', 'text-white');
            btn.classList.add('bg-white', 'text-gray-600');
        }
    });

    if (activeBtn) {
        activeBtn.classList.add('bg-[#4f00ff]', 'text-white');
        activeBtn.classList.remove('bg-white', 'text-gray-600');
    }
};

// Card Design

const displayIssues = (issues) => {
    const container = document.getElementById('issue-container');
    const countElement = document.getElementById('issue-count');
    
    countElement.innerText = `${issues.length} Issues`;
    container.innerHTML = issues.length === 0 
        ? `<div class="col-span-full text-center py-10 text-gray-400">No issues found.</div>` 
        : "";

    issues.forEach(issue => {
        const priority = (issue.priority || 'low').toLowerCase();
        
        
        let borderClass = "border-t-[#A855F7]"; 
        let pBg = "bg-[#EEEFF2] text-gray-600";
        let iconHtml = `<img src="../assets/tick.svg" alt="low">`;

        if (priority === 'high') {
            borderClass = "border-t-[#00A96E]";
            pBg = "bg-red-50 text-red-500";
            iconHtml = `<svg width="16" height="16" viewBox="0 0 16 16" fill="#22c55e"><path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path><path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path></svg>`;
        } else if (priority === 'medium') {
            borderClass = "border-t-[#00A96E]";
            pBg = "bg-[#FFF6D1] text-[#F59E0B]";
            iconHtml = `<svg width="16" height="16" viewBox="0 0 16 16" fill="#22c55e"><path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path><path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path></svg>`;
        }

        const card = document.createElement('div');
        card.className = `card bg-white border border-gray-100 shadow-sm p-4 rounded-xl cursor-pointer hover:shadow-md transition-all border-t-[3px] ${borderClass}`;
        card.onclick = () => openIssueModal(issue.id);

        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="w-8 h-8 flex items-center justify-center bg-[#f0fdf4] rounded-full border border-green-100">${iconHtml}</div>
                <span class="px-3 py-1 text-[12px] font-medium rounded-full uppercase ${pBg}">${priority}</span>
            </div>
            <h3 class="text-[14px] font-semibold text-[#1f2937] mb-2 leading-tight">${issue.title}</h3>
            <p class="text-[12px] text-[#64748B] mb-4 line-clamp-2">${issue.description}</p>
            <div class="flex flex-wrap gap-2 mb-6">
                ${issue.labels?.map(label => `
                    <span class="px-2 py-1 border text-[12px] rounded-full ${label.toLowerCase() === 'enhancement' ? 'bg-[#00A96E] text-white' : 'bg-pink-50 text-red-500 border-pink-100'}">
                        ${label.toUpperCase()}
                    </span>`).join('') || ''}
            </div>
            <hr class="mb-4 border-gray-100">
            <div class="text-[12px] text-[#64748B]">
                <p>#${issue.id} by ${issue.author?.replace(/_/g, ' ') || 'Unknown'}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
        `;
        container.appendChild(card);
    });
};

// Filter and Search logic

const setupFilter = () => {
    const btnAll = document.getElementById('btn-all');
    const btnOpen = document.getElementById('btn-open');
    const btnClosed = document.getElementById('btn-closed');

    const handleFilter = (btn, status) => {
        updateButtonStyles(btn);
        toggleLoading(true);
        const filtered = status === 'all' ? allIssues : allIssues.filter(i => i.status.toLowerCase() === status);
        displayIssues(filtered);
        toggleLoading(false);
    };

    if(btnAll) btnAll.onclick = () => handleFilter(btnAll, 'all');
    if(btnOpen) btnOpen.onclick = () => handleFilter(btnOpen, 'open');
    if(btnClosed) btnClosed.onclick = () => handleFilter(btnClosed, 'closed');
};

const setupSearch = () => {
    const input = document.getElementById('search-input');
    const btn = document.getElementById('search-btn');

    const doSearch = async () => {
        const query = input.value.trim();
        toggleLoading(true);
        try {
            const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
            const data = await res.json();
            displayIssues(Array.isArray(data) ? data : (data.data || []));
        } catch (err) { console.error(err); }
        finally { toggleLoading(false); }
    };

    if(btn) btn.onclick = doSearch;
    input?.addEventListener("keypress", (e) => e.key === 'Enter' && doSearch());
};

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
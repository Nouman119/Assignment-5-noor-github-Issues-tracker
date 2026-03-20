
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
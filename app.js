document.addEventListener('DOMContentLoaded', () => {
  // Admin panel: manage submissions and published comics
  const submissionListEl = document.getElementById('submissionList');
  if (submissionListEl) {
    let submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const renderSubmissions = () => {
      submissionListEl.innerHTML = '';
      submissions.forEach((sub, index) => {
        const div = document.createElement('div');
        div.className = 'submission';
        div.innerHTML = `
          <h3>${sub.title}</h3>
          <p>${sub.description}</p>
          <div class="submission-buttons">
            <button class="approve" data-index="${index}">Approve</button>
            <button class="reject" data-index="${index}">Reject</button>
          </div>
        `;
        submissionListEl.appendChild(div);
      });
    };
    submissionListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('approve')) {
        const idx = parseInt(e.target.dataset.index);
        const approved = submissions.splice(idx, 1)[0];
        let published = JSON.parse(localStorage.getItem('published') || '[]');
        published.push(approved);
        localStorage.setItem('published', JSON.stringify(published));
        localStorage.setItem('submissions', JSON.stringify(submissions));
        renderSubmissions();
      } else if (e.target.classList.contains('reject')) {
        const idx = parseInt(e.target.dataset.index);
        submissions.splice(idx, 1);
        localStorage.setItem('submissions', JSON.stringify(submissions));
        renderSubmissions();
      }
    });
    renderSubmissions();
  }

  // Submission form page: handle new submissions
  const submissionForm = document.getElementById('submissionForm');
  if (submissionForm) {
    submissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = submissionForm.querySelector('input[name="title"]').value;
      const description = submissionForm.querySelector('textarea[name="description"]').value;
      const imageUrl = submissionForm.querySelector('input[name="imageUrl"]').value;
      let submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
      submissions.push({ title, description, imageUrl });
      localStorage.setItem('submissions', JSON.stringify(submissions));
      submissionForm.reset();
      alert('Your submission has been sent for review!');
    });
  }
});

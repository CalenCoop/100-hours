const textareas = document.querySelectorAll('.postInput');

textareas.forEach((textarea) => {
  textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });
});
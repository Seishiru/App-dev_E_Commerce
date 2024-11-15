document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('clickMe');
  if (button) {
    button.addEventListener('click', function() {
      document.getElementById('message').textContent = 'Button clicked!';
    });
  }
});

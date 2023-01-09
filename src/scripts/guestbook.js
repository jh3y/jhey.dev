const guestbook = document.querySelector('[data-guestbook]')

if (guestbook) {
  const form = guestbook.querySelector('form')
  const details = guestbook.querySelector('details')
  const msg = guestbook.querySelector('p')
  const handleSubmit = e => {
    e.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        msg.classList.add('font-bold')
        msg.innerText = 'Thank you for your submission! 🎉'
        guestbook.role = 'status'
        guestbook.ariaLive = 'polite'
        details.remove()
      })
      .catch((error) => alert(error));
  };
  form.addEventListener("submit", handleSubmit);  
}


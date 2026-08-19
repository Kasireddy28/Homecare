const toast = document.getElementById('toast');
const session = JSON.parse(localStorage.getItem('homecare_session') || 'null');
if (!session) window.location.replace('login.html');
if (session && session.role !== 'customer') window.location.replace('portal.html');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
document.querySelectorAll('.category').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.category').forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
    showToast(`${card.dataset.name} services selected`);
  });
});
document.getElementById('offerButton').addEventListener('click', () => showToast('₹150 offer added to your account!'));
document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach((nav) => nav.classList.remove('selected'));
  item.classList.add('selected');
}));
document.getElementById('searchInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target.value.trim()) showToast(`Searching for “${event.target.value.trim()}”`);
});
document.getElementById('profileButton').addEventListener('click', () => { localStorage.removeItem('homecare_session'); window.location.href = 'login.html'; });

const services = [
  ['AC service & repair', 'From ₹499'], ['Refrigerator repair', 'From ₹349'],
  ['Washing machine repair', 'From ₹349'], ['Plumbing service', 'From ₹199'],
  ['Electrical service', 'From ₹199'], ['Deep cleaning', 'From ₹899']
];
const bookingSheet = document.getElementById('bookingSheet');
const servicesContainer = document.getElementById('bookingServices');
let selectedService = '';
let selectedSlot = 'Tomorrow, 9–11 AM';
services.forEach(([name, price]) => {
  const button = document.createElement('button');
  button.className = 'booking-service'; button.innerHTML = `${name}<small>${price}</small>`;
  button.addEventListener('click', () => {
    document.querySelectorAll('.booking-service').forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected'); selectedService = name;
    document.getElementById('toDetails').disabled = false;
  });
  servicesContainer.appendChild(button);
});
function showStep(number) {
  document.querySelectorAll('.booking-step').forEach((step) => step.classList.toggle('active', step.dataset.step === String(number)));
}
function openBooking() { bookingSheet.classList.add('open'); bookingSheet.setAttribute('aria-hidden', 'false'); showStep(1); }
function closeBooking() { bookingSheet.classList.remove('open'); bookingSheet.setAttribute('aria-hidden', 'true'); }
document.getElementById('bookButton').addEventListener('click', openBooking);
document.querySelectorAll('[data-close-sheet]').forEach((button) => button.addEventListener('click', closeBooking));
document.getElementById('toDetails').addEventListener('click', () => showStep(2));
document.getElementById('backToServices').addEventListener('click', () => showStep(1));
document.querySelectorAll('[data-slot]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-slot]').forEach((item) => item.classList.remove('chosen'));
  button.classList.add('chosen'); selectedSlot = button.dataset.slot;
}));
document.getElementById('confirmBooking').addEventListener('click', () => {
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.replace(/\D/g, '');
  if (!address || phone.length !== 10) return showToast('Please add an address and a valid 10-digit mobile number');
  const booking = { service: selectedService, slot: selectedSlot, address, createdAt: new Date().toISOString() };
  localStorage.setItem('homecare_latest_booking', JSON.stringify(booking));
  document.getElementById('successCopy').textContent = `${selectedService} is scheduled for ${selectedSlot}. Pay cash only after your service is completed.`;
  showStep(3);
});
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));

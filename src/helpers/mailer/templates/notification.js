export default (data) => {
  const message = {};
  message.subject = 'keetela - Notification';
  message.html = `<p id="notificationMessage">${data.message}</p>`;
  return message;
};

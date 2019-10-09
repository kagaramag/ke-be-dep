export default (data) => {
  const message = {};
  message.subject = 'Authors tutela - Notification';
  message.html = `<p id="notificationMessage">${data.message}</p>`;
  return message;
};

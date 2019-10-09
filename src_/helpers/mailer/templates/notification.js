export default (data) => {
  const message = {};
  message.subject = 's tutela - Notification';
  message.html = `<p id="notificationMessage">${data.message}</p>`;
  return message;
};

var interval;

function start_processing() {
  interval = setInterval(open_notifications, 1000);
}

function open_notifications() {
  let notifications = document.querySelectorAll(
    ".notification-listing .notification-row:not(.acknowledged) .action"
  );

  if (!notifications.length) {
    clearInterval(interval);
    console.log("Done with this page");
    go_to_next_page();
    return;
  }

  console.log("click");
  notifications[0].click();
}

function go_to_next_page() {
  let pagination = document.querySelector(
    ".notification-listing + .Pagination"
  );
  let next_page = pagination.querySelector(".is-active + .page");

  if (!next_page) {
    console.log("All done!");
  }

  console.log("Going to the next page");

  next_page.click();
  setTimeout(start_processing, 2000);
}
